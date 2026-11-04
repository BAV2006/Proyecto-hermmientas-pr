import type { ProductRepository } from '../domain/product.repository';
import type { IUpdate } from '../domain/product.entity';

export class UpdateUseCase {
  constructor(private repo: ProductRepository) {}

  execute(data: IUpdate) {
    return this.repo.update(data);
  }
}
