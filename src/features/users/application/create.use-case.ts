import type { UserRepository } from '../domain/user.repository';
import type { ICreate } from '../domain/user.entity';

export class CreateUseCase {
  constructor(private repo: UserRepository) {}

  execute(data: ICreate) {
    return this.repo.create(data);
  }
}
