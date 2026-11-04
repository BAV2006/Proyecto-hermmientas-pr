import type { CategoryRepository } from '../domain/category.repository';
import type { ICreate } from '../domain/category.entity';

export class CreateUseCase {
  constructor(private repo: CategoryRepository) {}

  execute(data: ICreate) {
    return this.repo.create(data);
  }
}
