import { NextResponse } from 'next/server';
import { aroma } from '@/src/commons/localizations';
import { logger } from '@/src/commons/utils/logger';
import { IRequestParams } from '@/src/commons/interfaces';
import { categoryContainer } from '../category.container';
import { categorySchema } from '../schema';

export async function listCategories() {
  try {
    const categories = await categoryContainer.listCategories.execute();
    return NextResponse.json(categories);
  } catch (error) {
    logger({ error: error as Error, module: 'listCategories' });
    return NextResponse.json({ error: aroma.errors.serverError }, { status: 500 });
  }
}

export async function createCategory(req: Request) {
  try {
    const bodyData = await req.json();
    const validation = categorySchema.safeParse(bodyData);
    if (!validation.success) {
      return NextResponse.json({ error: aroma.errors.unprocessableContent }, { status: 422 });
    }

    const status = await categoryContainer.createCategory.execute(validation.data);
    return NextResponse.json({ success: status });
  } catch (error) {
    logger({ error: error as Error, module: 'createCategory' });
    return NextResponse.json({ error: aroma.errors.serverError }, { status: 500 });
  }
}

export async function getCategoryById(req: Request, { params }: IRequestParams) {
  try {
    const { id } = await params;
    const category = await categoryContainer.getCategoryById.execute(Number(id));
    if (!category) {
      return NextResponse.json({ error: aroma.errors.notFound }, { status: 404 });
    }
    return NextResponse.json(category);
  } catch (error) {
    logger({ error: error as Error, module: 'getCategoryById' });
    return NextResponse.json({ error: aroma.errors.serverError }, { status: 500 });
  }
}

export async function updateCategory(req: Request, { params }: IRequestParams) {
  try {
    const { id } = await params;
    const bodyData = await req.json();
    const validation = categorySchema.safeParse(bodyData);
    if (!validation.success) {
      return NextResponse.json({ error: aroma.errors.unprocessableContent }, { status: 422 });
    }

    const status = await categoryContainer.updateCategory.execute({
      id: Number(id),
      ...validation.data,
    });
    return NextResponse.json({ success: status });
  } catch (error) {
    logger({ error: error as Error, module: 'updateCategory' });
    return NextResponse.json({ error: aroma.errors.serverError }, { status: 500 });
  }
}

export async function deleteCategory(req: Request, { params }: IRequestParams) {
  try {
    const { id } = await params;
    const status = await categoryContainer.deleteCategory.execute(Number(id));
    return NextResponse.json({ success: status });
  } catch (error) {
    logger({ error: error as Error, module: 'deleteCategory' });
    return NextResponse.json({ error: aroma.errors.serverError }, { status: 500 });
  }
}
