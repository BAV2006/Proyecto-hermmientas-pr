import { prisma } from '@/src/commons/utils/prisma';
import { Category, ICreate, IUpdate } from '../domain/category.entity';
import { CategoryRepository } from '../domain/category.repository';

export class PrismaCategoryRepository implements CategoryRepository {
  async list(): Promise<Category[]> {
    return prisma.categoria.findMany({ orderBy: { id: 'asc' } });
  }

  async create(data: ICreate): Promise<boolean> {
    await prisma.categoria.create({ data });
    return true;
  }

  async getById(id: number): Promise<Category | null> {
    return prisma.categoria.findUnique({ where: { id } });
  }

  async update(data: IUpdate): Promise<boolean> {
    const { id, ...fields } = data;
    await prisma.categoria.update({ where: { id }, data: fields });
    return true;
  }

  async delete(id: number): Promise<boolean> {
    await prisma.categoria.delete({ where: { id } });
    return true;
  }
}

