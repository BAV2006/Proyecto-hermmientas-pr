import {
  deleteCategory,
  getCategoryById,
  updateCategory,
} from '@/src/features/category/presentation/category.controller';

export const GET = getCategoryById;
export const PUT = updateCategory;
export const DELETE = deleteCategory;
