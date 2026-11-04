import { PrismaUserRepository } from './infrastructure/prisma-user.repository';
import { ListUseCase } from './application/list.use-case';
import { CreateUseCase } from './application/create.use-case';
import { GetByIdUseCase } from './application/get-by-id.use-case';
import { UpdateUseCase } from './application/update.use-case';
import { DeleteUseCase } from './application/delete.use-case';

// Aquí se arma todo: el repositorio de Prisma se entrega a cada caso de uso
const repository = new PrismaUserRepository();

export const userContainer = {
  listUsers: new ListUseCase(repository),
  createUser: new CreateUseCase(repository),
  getUserById: new GetByIdUseCase(repository),
  updateUser: new UpdateUseCase(repository),
  deleteUser: new DeleteUseCase(repository),
};
