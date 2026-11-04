import type { Product, ICreate, IUpdate } from './product.entity';

export interface ProductRepository {
  list(): Promise<Product[]>;
  create(data: ICreate): Promise<boolean>;
  getById(id: number): Promise<Product | null>;
  update(data: IUpdate): Promise<boolean>;
  delete(id: number): Promise<boolean>;
}
