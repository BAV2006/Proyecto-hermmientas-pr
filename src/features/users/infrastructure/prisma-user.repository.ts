import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { aroma } from '@/src/commons/localizations';
import { STAFF_ROLES } from '@/src/commons/constants';
import type { StaffRole, Status } from '@/src/commons/interfaces';
import { AppError, prismaErrorCode } from '@/src/commons/utils/errors';
import type { ICreate, IUpdate, User } from '../domain/user.entity';
import type { UserRepository } from '../domain/user.repository';

// Solo estas columnas salen de la base de datos: la contraseña nunca se consulta
const select = {
  id: true,
  nombre: true,
  correo: true,
  rol: true,
  estado: true,
  creadoEn: true,
} as const;

interface UsuarioRow {
  id: number;
  nombre: string;
  correo: string;
  rol: string;
  estado: Status;
  creadoEn: Date;
}

const toUser = (row: UsuarioRow): User => ({
  id: row.id,
  name: row.nombre,
  email: row.correo,
  role: row.rol as StaffRole,
  status: row.estado,
  createdAt: row.creadoEn,
});

export class PrismaUserRepository implements UserRepository {
  async list() {
    const rows = await prisma.usuario.findMany({
      where: { rol: { in: [...STAFF_ROLES] } },
      orderBy: { id: 'asc' },
      select,
    });
    return rows.map(toUser);
  }

  async create(data: ICreate) {
    const correo = data.email.trim().toLowerCase();

    const exists = await prisma.usuario.findUnique({ where: { correo }, select: { id: true } });
    if (exists) throw new AppError(aroma.errors.emailTaken, 409);

    try {
      await prisma.usuario.create({
        data: {
          nombre: data.name,
          correo,
          contrasenaHash: await bcrypt.hash(data.password, 10),
          rol: data.role,
          estado: data.status,
        },
      });
      return true;
    } catch (error) {
      if (prismaErrorCode(error) === 'P2002') {
        throw new AppError(aroma.errors.emailTaken, 409);
      }
      throw error;
    }
  }

  async getById(id: number) {
    const row = await this.findStaff(id);
    return row ? toUser(row) : null;
  }

  async update(data: IUpdate) {
    const correo = data.email.trim().toLowerCase();

    if (!(await this.findStaff(data.id))) throw new AppError(aroma.errors.notFound, 404);

    const taken = await prisma.usuario.findFirst({
      where: { correo, NOT: { id: data.id } },
      select: { id: true },
    });
    if (taken) throw new AppError(aroma.errors.emailTaken, 409);

    // No dejar el sistema sin administrador activo
    const leavesAdmin = data.role !== 'ADMINISTRADOR' || data.status !== 'ACTIVO';
    if (leavesAdmin && (await this.isLastActiveAdmin(data.id))) {
      throw new AppError(aroma.errors.lastAdmin, 409);
    }

    try {
      await prisma.usuario.update({
        where: { id: data.id },
        data: {
          nombre: data.name,
          correo,
          rol: data.role,
          estado: data.status,
          ...(data.password ? { contrasenaHash: await bcrypt.hash(data.password, 10) } : {}),
        },
      });
      return true;
    } catch (error) {
      const code = prismaErrorCode(error);
      if (code === 'P2025') throw new AppError(aroma.errors.notFound, 404);
      if (code === 'P2002') throw new AppError(aroma.errors.emailTaken, 409);
      throw error;
    }
  }

  async delete(id: number) {
    if (!(await this.findStaff(id))) throw new AppError(aroma.errors.notFound, 404);
    if (await this.isLastActiveAdmin(id)) throw new AppError(aroma.errors.lastAdmin, 409);

    try {
      await prisma.usuario.delete({ where: { id } });
      return true;
    } catch (error) {
      const code = prismaErrorCode(error);
      if (code === 'P2025') throw new AppError(aroma.errors.notFound, 404);
      if (code === 'P2003') throw new AppError(aroma.errors.deleteInUse, 409);
      throw error;
    }
  }

  // Los clientes no se administran desde este módulo
  private async findStaff(id: number) {
    const row = await prisma.usuario.findUnique({ where: { id }, select });
    return row && row.rol !== 'CLIENTE' ? row : null;
  }

  // ¿Es el único administrador activo?
  private async isLastActiveAdmin(id: number) {
    const target = await prisma.usuario.findUnique({
      where: { id },
      select: { rol: true, estado: true },
    });
    if (!target || target.rol !== 'ADMINISTRADOR' || target.estado !== 'ACTIVO') return false;

    const others = await prisma.usuario.count({
      where: { rol: 'ADMINISTRADOR', estado: 'ACTIVO', NOT: { id } },
    });
    return others === 0;
  }
}
