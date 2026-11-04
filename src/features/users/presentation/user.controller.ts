import { NextResponse, connection } from 'next/server';
import { userContainer } from '../user.container';
import { aroma } from '@/src/commons/localizations';
import { errorResponse, handleError, parseId } from '@/src/commons/utils/api-response';
import type { IRequestParams } from '@/src/commons/interfaces';
import { userCreateSchema, userUpdateSchema } from '../schema';

export async function listUsers() {
  try {
    await connection();
    const items = await userContainer.listUsers.execute();
    return NextResponse.json(items);
  } catch (error) {
    return handleError(error, 'listUsers');
  }
}

export async function createUser(req: Request) {
  try {
    const bodyData = await req.json().catch(() => null);
    const validation = userCreateSchema.safeParse(bodyData);
    if (!validation.success) {
      return errorResponse(aroma.errors.unprocessableContent, 422);
    }

    const status = await userContainer.createUser.execute({ name: validation.data.name, email: validation.data.email, role: validation.data.role, status: validation.data.status, password: validation.data.password });
    return NextResponse.json({ success: status }, { status: 201 });
  } catch (error) {
    return handleError(error, 'createUser');
  }
}

export async function getUserById(_req: Request, { params }: IRequestParams) {
  try {
    const id = parseId((await params).id);
    if (id === null) return errorResponse(aroma.errors.notFound, 404);

    const item = await userContainer.getUserById.execute(id);
    if (!item) return errorResponse(aroma.errors.notFound, 404);

    return NextResponse.json(item);
  } catch (error) {
    return handleError(error, 'getUserById');
  }
}

export async function updateUser(req: Request, { params }: IRequestParams) {
  try {
    const id = parseId((await params).id);
    if (id === null) return errorResponse(aroma.errors.notFound, 404);

    const bodyData = await req.json().catch(() => null);
    const validation = userUpdateSchema.safeParse(bodyData);
    if (!validation.success) {
      return errorResponse(aroma.errors.unprocessableContent, 422);
    }

    const status = await userContainer.updateUser.execute({ id, ...{ name: validation.data.name, email: validation.data.email, role: validation.data.role, status: validation.data.status, password: validation.data.password } });
    return NextResponse.json({ success: status });
  } catch (error) {
    return handleError(error, 'updateUser');
  }
}

export async function deleteUser(_req: Request, { params }: IRequestParams) {
  try {
    const id = parseId((await params).id);
    if (id === null) return errorResponse(aroma.errors.notFound, 404);

    const status = await userContainer.deleteUser.execute(id);
    return NextResponse.json({ success: status });
  } catch (error) {
    return handleError(error, 'deleteUser');
  }
}
