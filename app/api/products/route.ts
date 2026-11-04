import { listProducts, createProduct } from '@/src/features/products/presentation/product.controller';

// Enlaza los métodos HTTP con el controlador
export async function GET() {
  return listProducts();
}

export async function POST(req: Request) {
  return createProduct(req);
}
