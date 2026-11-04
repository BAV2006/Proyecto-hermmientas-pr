import { PrismaCategoryRepository } from './infrastructure/prisma-category.repository';
import { ListUseCase } from './application/list.use-case';
import { CreateUseCase } from './application/create.use-case';
import { GetByIdUseCase } from './application/get-by-id.use-case';
import { UpdateUseCase } from './application/update.use-case';
import { DeleteUseCase } from './application/delete.use-case';

// Aquí se arma todo: el repositorio de Prisma se entrega a cada caso de uso
const repository = new PrismaCategoryRepository();

export const categoryContainer = {
  listCategories: new ListUseCase(repository),
  createCategory: new CreateUseCase(repository),
  getCategoryById: new GetByIdUseCase(repository),
  updateCategory: new UpdateUseCase(repository),
  deleteCategory: new DeleteUseCase(repository),
};
