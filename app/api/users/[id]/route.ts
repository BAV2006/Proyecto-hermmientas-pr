import { getUserById, updateUser, deleteUser } from '@/src/features/users/presentation/user.controller';
import type { IRequestParams } from '@/src/commons/interfaces';

// Enlaza los métodos HTTP con el controlador
export async function GET(req: Request, context: IRequestParams) {
  return getUserById(req, context);
}

export async function PUT(req: Request, context: IRequestParams) {
  return updateUser(req, context);
}

export async function DELETE(req: Request, context: IRequestParams) {
  return deleteUser(req, context);
}
