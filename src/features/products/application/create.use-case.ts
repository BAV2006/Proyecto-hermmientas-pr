import type { ProductRepository } from '../domain/product.repository';
import type { ICreate } from '../domain/product.entity';

export class CreateUseCase {
  constructor(private repo: ProductRepository) {}

  execute(data: ICreate) {
    return this.repo.create(data);
  }
}
