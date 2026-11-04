import type { User, ICreate, IUpdate } from './user.entity';

export interface UserRepository {
  list(): Promise<User[]>;
  create(data: ICreate): Promise<boolean>;
  getById(id: number): Promise<User | null>;
  update(data: IUpdate): Promise<boolean>;
  delete(id: number): Promise<boolean>;
}
