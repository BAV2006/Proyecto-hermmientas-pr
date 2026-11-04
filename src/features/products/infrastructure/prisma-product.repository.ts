import { prisma } from '@/lib/prisma';
import { aroma } from '@/src/commons/localizations';
import type { Status } from '@/src/commons/interfaces';
import { AppError, prismaErrorCode } from '@/src/commons/utils/errors';
import type { ICreate, IUpdate, Product } from '../domain/product.entity';
import type { ProductRepository } from '../domain/product.repository';

// Cada producto se consulta junto al nombre de su categoría
const include = { categoria: { select: { nombre: true } } } as const;

interface ProductoRow {
  id: number;
  nombre: string;
  descripcion: string | null;
  precio: number;
  stock: number;
  stockMinimo: number;
  destacado: boolean;
  imagen: string | null;
  estado: Status;
  categoriaId: number;
  creadoEn: Date;
  categoria: { nombre: string };
}

const toProduct = (row: ProductoRow): Product => ({
  id: row.id,
  name: row.nombre,
  description: row.descripcion ?? '',
  price: row.precio,
  stock: row.stock,
  minStock: row.stockMinimo,
  featured: row.destacado,
  image: row.imagen ?? '',
  status: row.estado,
  categoryId: row.categoriaId,
  categoryName: row.categoria.nombre,
  createdAt: row.creadoEn,
});

// Datos del producto en el idioma de la base de datos
const toData = (data: ICreate) => ({
  nombre: data.name,
  descripcion: data.description || null,
  precio: data.price,
  stock: data.stock,
  estado: data.status,
  imagen: data.image || null,
  destacado: data.featured,
  categoriaId: data.categoryId,
});

export class PrismaProductRepository implements ProductRepository {
  async list() {
    const rows = await prisma.producto.findMany({ include, orderBy: { id: 'asc' } });
    return rows.map(toProduct);
  }

  async create(data: ICreate) {
    try {
      await prisma.producto.create({ data: toData(data) });
      return true;
    } catch (error) {
      const code = prismaErrorCode(error);
      if (code === 'P2002') throw new AppError(aroma.errors.duplicated, 409);
      if (code === 'P2003') throw new AppError(aroma.errors.invalidCategory, 422);
      throw error;
    }
  }

  async getById(id: number) {
    const row = await prisma.producto.findUnique({ where: { id }, include });
    return row ? toProduct(row) : null;
  }

  async update(data: IUpdate) {
    try {
      await prisma.producto.update({ where: { id: data.id }, data: toData(data) });
      return true;
    } catch (error) {
      const code = prismaErrorCode(error);
      if (code === 'P2025') throw new AppError(aroma.errors.notFound, 404);
      if (code === 'P2002') throw new AppError(aroma.errors.duplicated, 409);
      if (code === 'P2003') throw new AppError(aroma.errors.invalidCategory, 422);
      throw error;
    }
  }

  async delete(id: number) {
    try {
      await prisma.producto.delete({ where: { id } });
      return true;
    } catch (error) {
      const code = prismaErrorCode(error);
      if (code === 'P2025') throw new AppError(aroma.errors.notFound, 404);
      if (code === 'P2003') throw new AppError(aroma.errors.deleteInUse, 409);
      throw error;
    }
  }
}
