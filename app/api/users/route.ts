import { listUsers, createUser } from '@/src/features/users/presentation/user.controller';

// Enlaza los métodos HTTP con el controlador
export async function GET() {
  return listUsers();
}

export async function POST(req: Request) {
  return createUser(req);
}
