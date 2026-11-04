import type { Category, ICreate, IUpdate } from './category.entity';

export interface CategoryRepository {
  list(): Promise<Category[]>;
  create(data: ICreate): Promise<boolean>;
  getById(id: number): Promise<Category | null>;
  update(data: IUpdate): Promise<boolean>;
  delete(id: number): Promise<boolean>;
}
