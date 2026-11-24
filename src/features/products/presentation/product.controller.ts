import { NextResponse, connection } from 'next/server';
import { productContainer } from '../product.container';
import { aroma } from '@/src/commons/localizations';
import { errorResponse, handleError, parseId, successResponse } from '@/src/commons/utils/api-response';
import type { IRequestParams } from '@/src/commons/interfaces';
import type { ICreate } from '../domain/product.entity';
import { productSchema } from '../schema';

type ValidProduct = ReturnType<typeof productSchema.parse>;

// Pasa los datos ya validados al formato que entiende el caso de uso
function toCreate(v: ValidProduct): ICreate {
  const data: ICreate = {
    name: v.name,
    description: v.description ?? '',
    price: v.price,
    stock: v.stock,
    status: v.status,
    featured: v.featured,
    categoryId: v.categoryId,
  };
  if (v.image instanceof File && v.image.size > 0) data.image = v.image;
  return data;
}

// Lee el FormData de la petición y lo valida con zod (devuelve null si no es válido)
async function readProduct(req: Request) {
  const formData = await req.formData().catch(() => null);
  if (!formData) return null;

  const validation = productSchema.safeParse(Object.fromEntries(formData.entries()));
  return validation.success ? validation.data : null;
}

export async function listProducts() {
  try {
    await connection();
    const items = await productContainer.listProducts.execute();
    return successResponse(items);
  } catch (error) {
    return handleError(error, 'listProducts');
  }
}

export async function createProduct(req: Request) {
  try {
    const valid = await readProduct(req);
    if (!valid) return errorResponse(aroma.errors.unprocessableContent, 422);

    const status = await productContainer.createProduct.execute(toCreate(valid));
    return NextResponse.json({ success: status }, { status: 201 });
  } catch (error) {
    return handleError(error, 'createProduct');
  }
}

export async function getProductById(_req: Request, { params }: IRequestParams) {
  try {
    const id = parseId((await params).id);
    if (id === null) return errorResponse(aroma.errors.notFound, 404);

    const item = await productContainer.getProductById.execute(id);
    if (!item) return errorResponse(aroma.errors.notFound, 404);

    return successResponse(item);
  } catch (error) {
    return handleError(error, 'getProductById');
  }
}

export async function updateProduct(req: Request, { params }: IRequestParams) {
  try {
    const id = parseId((await params).id);
    if (id === null) return errorResponse(aroma.errors.notFound, 404);

    const valid = await readProduct(req);
    if (!valid) return errorResponse(aroma.errors.unprocessableContent, 422);

    const status = await productContainer.updateProduct.execute({ id, ...toCreate(valid) });
    return NextResponse.json({ success: status });
  } catch (error) {
    return handleError(error, 'updateProduct');
  }
}

export async function deleteProduct(_req: Request, { params }: IRequestParams) {
  try {
    const id = parseId((await params).id);
    if (id === null) return errorResponse(aroma.errors.notFound, 404);

    const status = await productContainer.deleteProduct.execute(id);
    return NextResponse.json({ success: status });
  } catch (error) {
    return handleError(error, 'deleteProduct');
  }
}
