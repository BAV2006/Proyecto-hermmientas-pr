import { listCategories, createCategory } from '@/src/features/category/presentation/category.controller';

// Enlaza los métodos HTTP con el controlador
export async function GET() {
  return listCategories();
}

export async function POST(req: Request) {
  return createCategory(req);
}
