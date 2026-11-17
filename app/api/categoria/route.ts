import {
  createCategory,
  listCategories,
} from '@/src/features/category/presentation/category.controller';

export const GET = listCategories;
export const POST = createCategory;
