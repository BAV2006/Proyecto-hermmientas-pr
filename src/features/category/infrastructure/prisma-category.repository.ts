import { prisma } from '@/lib/prisma';
import { aroma } from '@/src/commons/localizations';
import type { Status } from '@/src/commons/interfaces';
import { AppError, prismaErrorCode } from '@/src/commons/utils/errors';
import type { Category, ICreate, IUpdate } from '../domain/category.entity';
import type { CategoryRepository } from '../domain/category.repository';

// Fila de la tabla "categorias" (español) -> entidad del dominio (inglés)
interface CategoriaRow {
  id: number;
  nombre: string;
  estado: Status;
  creadoEn: Date;
}

const toCategory = (row: CategoriaRow): Category => ({
  id: row.id,
  name: row.nombre,
  status: row.estado,
  createdAt: row.creadoEn,
});

export class PrismaCategoryRepository implements CategoryRepository {
  async list() {
    const rows = await prisma.categoria.findMany({ orderBy: { id: 'asc' } });
    return rows.map(toCategory);
  }

  async create(data: ICreate) {
    await this.assertNameFree(data.name);
    try {
      await prisma.categoria.create({
        data: { nombre: data.name, estado: data.status },
      });
      return true;
    } catch (error) {
      if (prismaErrorCode(error) === 'P2002') {
        throw new AppError(aroma.errors.duplicated, 409);
      }
      throw error;
    }
  }

  async getById(id: number) {
    const row = await prisma.categoria.findUnique({ where: { id } });
    return row ? toCategory(row) : null;
  }

  async update(data: IUpdate) {
    await this.assertNameFree(data.name, data.id);
    try {
      await prisma.categoria.update({
        where: { id: data.id },
        data: { nombre: data.name, estado: data.status },
      });
      return true;
    } catch (error) {
      const code = prismaErrorCode(error);
      if (code === 'P2025') throw new AppError(aroma.errors.notFound, 404);
      if (code === 'P2002') throw new AppError(aroma.errors.duplicated, 409);
      throw error;
    }
  }

  async delete(id: number) {
    try {
      await prisma.categoria.delete({ where: { id } });
      return true;
    } catch (error) {
      const code = prismaErrorCode(error);
      if (code === 'P2025') throw new AppError(aroma.errors.notFound, 404);
      if (code === 'P2003') throw new AppError(aroma.errors.deleteInUse, 409);
      throw error;
    }
  }

  // No permite dos categorías con el mismo nombre (sin importar mayúsculas)
  private async assertNameFree(name: string, exceptId?: number) {
    const found = await prisma.categoria.findFirst({
      where: {
        nombre: { equals: name, mode: 'insensitive' },
        ...(exceptId ? { NOT: { id: exceptId } } : {}),
      },
      select: { id: true },
    });
    if (found) throw new AppError(aroma.errors.duplicated, 409);
  }
}
