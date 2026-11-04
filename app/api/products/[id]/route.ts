import { getProductById, updateProduct, deleteProduct } from '@/src/features/products/presentation/product.controller';
import type { IRequestParams } from '@/src/commons/interfaces';

// Enlaza los métodos HTTP con el controlador
export async function GET(req: Request, context: IRequestParams) {
  return getProductById(req, context);
}

export async function PUT(req: Request, context: IRequestParams) {
  return updateProduct(req, context);
}

export async function DELETE(req: Request, context: IRequestParams) {
  return deleteProduct(req, context);
}
