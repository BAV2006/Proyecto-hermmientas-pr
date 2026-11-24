import { NextResponse, connection } from 'next/server';
import { categoryContainer } from '../category.container';
import { aroma } from '@/src/commons/localizations';
import { errorResponse, handleError, parseId, successResponse } from '@/src/commons/utils/api-response';
import type { IRequestParams } from '@/src/commons/interfaces';
import { categorySchema } from '../schema';

export async function listCategories() {
  try {
    await connection();
    const items = await categoryContainer.listCategories.execute();
    return successResponse(items);
  } catch (error) {
    return handleError(error, 'listCategories');
  }
}

export async function createCategory(req: Request) {
  try {
    const bodyData = await req.json().catch(() => null);
    const validation = categorySchema.safeParse(bodyData);
    if (!validation.success) {
      return errorResponse(aroma.errors.unprocessableContent, 422);
    }

    const status = await categoryContainer.createCategory.execute(validation.data);
    return NextResponse.json({ success: status }, { status: 201 });
  } catch (error) {
    return handleError(error, 'createCategory');
  }
}

export async function getCategoryById(_req: Request, { params }: IRequestParams) {
  try {
    const id = parseId((await params).id);
    if (id === null) return errorResponse(aroma.errors.notFound, 404);

    const item = await categoryContainer.getCategoryById.execute(id);
    if (!item) return errorResponse(aroma.errors.notFound, 404);

    return successResponse(item);
  } catch (error) {
    return handleError(error, 'getCategoryById');
  }
}

export async function updateCategory(req: Request, { params }: IRequestParams) {
  try {
    const id = parseId((await params).id);
    if (id === null) return errorResponse(aroma.errors.notFound, 404);

    const bodyData = await req.json().catch(() => null);
    const validation = categorySchema.safeParse(bodyData);
    if (!validation.success) {
      return errorResponse(aroma.errors.unprocessableContent, 422);
    }

    const status = await categoryContainer.updateCategory.execute({ id, ...validation.data });
    return NextResponse.json({ success: status });
  } catch (error) {
    return handleError(error, 'updateCategory');
  }
}

export async function deleteCategory(_req: Request, { params }: IRequestParams) {
  try {
    const id = parseId((await params).id);
    if (id === null) return errorResponse(aroma.errors.notFound, 404);

    const status = await categoryContainer.deleteCategory.execute(id);
    return NextResponse.json({ success: status });
  } catch (error) {
    return handleError(error, 'deleteCategory');
  }
}
