import { prisma } from '@/lib/prisma';
import { aroma } from '@/src/commons/localizations';
import type { Status } from '@/src/commons/interfaces';
import { AppError, prismaErrorCode } from '@/src/commons/utils/errors';
import { uploadImage } from '@/src/commons/utils/upload';
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

// Datos del producto en el idioma de la base de datos.
// Si trae una imagen nueva la sube a Vercel Blob; si no, la imagen actual no se toca.
async function toData(data: ICreate) {
  const base = {
    nombre: data.name,
    descripcion: data.description || null,
    precio: data.price,
    stock: data.stock,
    estado: data.status,
    destacado: data.featured,
    categoriaId: data.categoryId,
  };

  if (!data.image) return base;

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new AppError(aroma.errors.uploadNotConfigured, 503);
  }
  const url = await uploadImage('products', data.image);
  if (!url) throw new AppError(aroma.errors.uploadFailed, 502);

  return { ...base, imagen: url };
}

export class PrismaProductRepository implements ProductRepository {
  async list() {
    const rows = await prisma.producto.findMany({ include, orderBy: { id: 'asc' } });
    return rows.map(toProduct);
  }

  async create(data: ICreate) {
    await this.assertNameFree(data.categoryId, data.name);
    try {
      await prisma.producto.create({ data: await toData(data) });
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
    await this.assertNameFree(data.categoryId, data.name, data.id);
    try {
      await prisma.producto.update({ where: { id: data.id }, data: await toData(data) });
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

  // No repite un producto dentro de la misma categoría (se revisa antes de subir la imagen)
  private async assertNameFree(categoryId: number, name: string, exceptId?: number) {
    const found = await prisma.producto.findFirst({
      where: {
        categoriaId: categoryId,
        nombre: { equals: name, mode: 'insensitive' },
        ...(exceptId ? { NOT: { id: exceptId } } : {}),
      },
      select: { id: true },
    });
    if (found) throw new AppError(aroma.errors.duplicated, 409);
  }
}
