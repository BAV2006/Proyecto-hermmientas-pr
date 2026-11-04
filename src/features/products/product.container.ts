import { PrismaProductRepository } from './infrastructure/prisma-product.repository';
import { ListUseCase } from './application/list.use-case';
import { CreateUseCase } from './application/create.use-case';
import { GetByIdUseCase } from './application/get-by-id.use-case';
import { UpdateUseCase } from './application/update.use-case';
import { DeleteUseCase } from './application/delete.use-case';

// Aquí se arma todo: el repositorio de Prisma se entrega a cada caso de uso
const repository = new PrismaProductRepository();

export const productContainer = {
  listProducts: new ListUseCase(repository),
  createProduct: new CreateUseCase(repository),
  getProductById: new GetByIdUseCase(repository),
  updateProduct: new UpdateUseCase(repository),
  deleteProduct: new DeleteUseCase(repository),
};
