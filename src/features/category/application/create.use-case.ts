import { ICreate } from '../domain/category.entity';
import { CategoryRepository } from '../domain/category.repository';

export class CreateUseCase {
  constructor(private repo: CategoryRepository) {}

  execute(data: ICreate) {
    return this.repo.create(data);
  }
}
