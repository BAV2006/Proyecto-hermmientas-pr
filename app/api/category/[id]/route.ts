import { getCategoryById, updateCategory, deleteCategory } from '@/src/features/category/presentation/category.controller';
import type { IRequestParams } from '@/src/commons/interfaces';

// Enlaza los métodos HTTP con el controlador
export async function GET(req: Request, context: IRequestParams) {
  return getCategoryById(req, context);
}

export async function PUT(req: Request, context: IRequestParams) {
  return updateCategory(req, context);
}

export async function DELETE(req: Request, context: IRequestParams) {
  return deleteCategory(req, context);
}
