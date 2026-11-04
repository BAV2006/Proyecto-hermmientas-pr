import { NextResponse, connection } from 'next/server';
import { productContainer } from '../product.container';
import { aroma } from '@/src/commons/localizations';
import { errorResponse, handleError, parseId } from '@/src/commons/utils/api-response';
import type { IRequestParams } from '@/src/commons/interfaces';
import { productSchema } from '../schema';

export async function listProducts() {
  try {
    await connection();
    const items = await productContainer.listProducts.execute();
    return NextResponse.json(items);
  } catch (error) {
    return handleError(error, 'listProducts');
  }
}

export async function createProduct(req: Request) {
  try {
    const bodyData = await req.json().catch(() => null);
    const validation = productSchema.safeParse(bodyData);
    if (!validation.success) {
      return errorResponse(aroma.errors.unprocessableContent, 422);
    }

    const status = await productContainer.createProduct.execute(validation.data);
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

    return NextResponse.json(item);
  } catch (error) {
    return handleError(error, 'getProductById');
  }
}

export async function updateProduct(req: Request, { params }: IRequestParams) {
  try {
    const id = parseId((await params).id);
    if (id === null) return errorResponse(aroma.errors.notFound, 404);

    const bodyData = await req.json().catch(() => null);
    const validation = productSchema.safeParse(bodyData);
    if (!validation.success) {
      return errorResponse(aroma.errors.unprocessableContent, 422);
    }

    const status = await productContainer.updateProduct.execute({ id, ...validation.data });
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
