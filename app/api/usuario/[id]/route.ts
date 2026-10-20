import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/src/commons/utils/prisma";
import { jsonError, parseId, prismaErrorCode } from "@/src/commons/utils/api-response";
import { aroma } from "@/src/commons/localizations";
import { userUpdateSchema } from "@/src/features/users/schema";
import { toUser } from "@/src/features/users/mapper";
import { findStaff, isLastActiveAdmin, userSelect } from "@/src/features/users/server";

type Context = { params: Promise<{ id: string }> };

// GET /api/usuario/:id
export async function GET(_request: Request, { params }: Context) {
  const id = parseId((await params).id);
  if (id === null) return jsonError(aroma.errors.notFound, 404);

  try {
    const row = await findStaff(id);
    if (!row) return jsonError(aroma.errors.notFound, 404);
    return NextResponse.json(toUser(row));
  } catch {
    return jsonError(aroma.errors.serverError, 500);
  }
}

// PUT /api/usuario/:id -> actualiza (la contraseña solo cambia si se envía)
export async function PUT(request: Request, { params }: Context) {
  const id = parseId((await params).id);
  if (id === null) return jsonError(aroma.errors.notFound, 404);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError(aroma.errors.unprocessableContent, 422);
  }

  const parsed = userUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(aroma.errors.unprocessableContent, 422);
  }
  const { name, email, role, status, password } = parsed.data;
  const correo = email.trim().toLowerCase();

  try {
    if (!(await findStaff(id))) return jsonError(aroma.errors.notFound, 404);

    const taken = await prisma.usuario.findFirst({
      where: { correo, NOT: { id } },
      select: { id: true },
    });
    if (taken) return jsonError(aroma.errors.emailTaken, 409);

    // no dejar el sistema sin administrador activo
    if ((role !== "ADMINISTRADOR" || status !== "ACTIVO") && (await isLastActiveAdmin(id))) {
      return jsonError(aroma.errors.lastAdmin, 409);
    }

    const row = await prisma.usuario.update({
      where: { id },
      data: {
        nombre: name,
        correo,
        rol: role,
        estado: status,
        ...(password ? { contrasenaHash: await bcrypt.hash(password, 10) } : {}),
      },
      select: userSelect,
    });
    return NextResponse.json(toUser(row));
  } catch (error) {
    const code = prismaErrorCode(error);
    if (code === "P2025") return jsonError(aroma.errors.notFound, 404);
    if (code === "P2002") return jsonError(aroma.errors.emailTaken, 409);
    return jsonError(aroma.errors.updated, 500);
  }
}

// DELETE /api/usuario/:id -> elimina (si no tiene pedidos y no es el único administrador)
export async function DELETE(_request: Request, { params }: Context) {
  const id = parseId((await params).id);
  if (id === null) return jsonError(aroma.errors.notFound, 404);

  try {
    if (!(await findStaff(id))) return jsonError(aroma.errors.notFound, 404);
    if (await isLastActiveAdmin(id)) return jsonError(aroma.errors.lastAdmin, 409);

    await prisma.usuario.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    const code = prismaErrorCode(error);
    if (code === "P2025") return jsonError(aroma.errors.notFound, 404);
    if (code === "P2003") return jsonError(aroma.errors.deleteInUse, 409);
    return jsonError(aroma.errors.deleted, 500);
  }
}
