import { IUpdate } from '../domain/category.entity';
import { CategoryRepository } from '../domain/category.repository';

export class UpdateUseCase {
  constructor(private repo: CategoryRepository) {}

  execute(data: IUpdate) {
    return this.repo.update(data);
  }
}
