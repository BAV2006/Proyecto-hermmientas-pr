import type { UserRepository } from '../domain/user.repository';
import type { IUpdate } from '../domain/user.entity';

export class UpdateUseCase {
  constructor(private repo: UserRepository) {}

  execute(data: IUpdate) {
    return this.repo.update(data);
  }
}
