import { NextResponse, connection } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/src/commons/utils/prisma";
import { jsonError, prismaErrorCode } from "@/src/commons/utils/api-response";
import { aroma } from "@/src/commons/localizations";
import { STAFF_ROLES } from "@/src/commons/constants";
import { userCreateSchema } from "@/src/features/users/schema";
import { toUser } from "@/src/features/users/mapper";
import { userSelect } from "@/src/features/users/server";

// GET /api/usuario -> lista del personal (sin contraseñas)
export async function GET() {
  await connection();
  try {
    const rows = await prisma.usuario.findMany({
      where: { rol: { in: [...STAFF_ROLES] } },
      orderBy: { id: "asc" },
      select: userSelect,
    });
    return NextResponse.json(rows.map(toUser));
  } catch {
    return jsonError(aroma.errors.serverError, 500);
  }
}

// POST /api/usuario -> crea un usuario del personal
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError(aroma.errors.unprocessableContent, 422);
  }

  const parsed = userCreateSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(aroma.errors.unprocessableContent, 422);
  }
  const { name, email, role, status, password } = parsed.data;
  const correo = email.trim().toLowerCase();

  try {
    const exists = await prisma.usuario.findUnique({ where: { correo }, select: { id: true } });
    if (exists) return jsonError(aroma.errors.emailTaken, 409);

    const contrasenaHash = await bcrypt.hash(password, 10);
    const row = await prisma.usuario.create({
      data: { nombre: name, correo, contrasenaHash, rol: role, estado: status },
      select: userSelect,
    });
    return NextResponse.json(toUser(row), { status: 201 });
  } catch (error) {
    if (prismaErrorCode(error) === "P2002") return jsonError(aroma.errors.emailTaken, 409);
    return jsonError(aroma.errors.created, 500);
  }
}
