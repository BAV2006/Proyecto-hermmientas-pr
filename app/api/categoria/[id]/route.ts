import { NextResponse } from "next/server";
import { prisma } from "@/src/commons/utils/prisma";
import { jsonError, parseId, prismaErrorCode } from "@/src/commons/utils/api-response";
import { aroma } from "@/src/commons/localizations";
import { categorySchema } from "@/src/features/category/schema";
import { toCategory } from "@/src/features/category/mapper";

type Context = { params: Promise<{ id: string }> };

// GET /api/categoria/:id -> una categoría
export async function GET(_request: Request, { params }: Context) {
  const id = parseId((await params).id);
  if (id === null) return jsonError(aroma.errors.notFound, 404);

  try {
    const row = await prisma.categoria.findUnique({ where: { id } });
    if (!row) return jsonError(aroma.errors.notFound, 404);
    return NextResponse.json(toCategory(row));
  } catch {
    return jsonError(aroma.errors.serverError, 500);
  }
}

// PUT /api/categoria/:id -> actualiza una categoría
export async function PUT(request: Request, { params }: Context) {
  const id = parseId((await params).id);
  if (id === null) return jsonError(aroma.errors.notFound, 404);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError(aroma.errors.unprocessableContent, 422);
  }

  const parsed = categorySchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(aroma.errors.unprocessableContent, 422);
  }
  const { name, status } = parsed.data;

  try {
    const duplicated = await prisma.categoria.findFirst({
      where: { nombre: { equals: name, mode: "insensitive" }, NOT: { id } },
    });
    if (duplicated) return jsonError(aroma.errors.duplicated, 409);

    const row = await prisma.categoria.update({
      where: { id },
      data: { nombre: name, estado: status },
    });
    return NextResponse.json(toCategory(row));
  } catch (error) {
    const code = prismaErrorCode(error);
    if (code === "P2025") return jsonError(aroma.errors.notFound, 404);
    if (code === "P2002") return jsonError(aroma.errors.duplicated, 409);
    return jsonError(aroma.errors.updated, 500);
  }
}

// DELETE /api/categoria/:id -> elimina una categoría (si no tiene productos)
export async function DELETE(_request: Request, { params }: Context) {
  const id = parseId((await params).id);
  if (id === null) return jsonError(aroma.errors.notFound, 404);

  try {
    await prisma.categoria.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    const code = prismaErrorCode(error);
    if (code === "P2025") return jsonError(aroma.errors.notFound, 404);
    if (code === "P2003") return jsonError(aroma.errors.deleteInUse, 409);
    return jsonError(aroma.errors.deleted, 500);
  }
}
