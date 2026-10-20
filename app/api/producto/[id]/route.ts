import { NextResponse } from "next/server";
import { prisma } from "@/src/commons/utils/prisma";
import { jsonError, parseId, prismaErrorCode } from "@/src/commons/utils/api-response";
import { aroma } from "@/src/commons/localizations";
import { productSchema } from "@/src/features/products/schema";
import { toProduct } from "@/src/features/products/mapper";

const include = { categoria: { select: { nombre: true } } } as const;

type Context = { params: Promise<{ id: string }> };

// GET /api/producto/:id
export async function GET(_request: Request, { params }: Context) {
  const id = parseId((await params).id);
  if (id === null) return jsonError(aroma.errors.notFound, 404);

  try {
    const row = await prisma.producto.findUnique({ where: { id }, include });
    if (!row) return jsonError(aroma.errors.notFound, 404);
    return NextResponse.json(toProduct(row));
  } catch {
    return jsonError(aroma.errors.serverError, 500);
  }
}

// PUT /api/producto/:id -> actualiza un producto
export async function PUT(request: Request, { params }: Context) {
  const id = parseId((await params).id);
  if (id === null) return jsonError(aroma.errors.notFound, 404);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError(aroma.errors.unprocessableContent, 422);
  }

  const parsed = productSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(aroma.errors.unprocessableContent, 422);
  }
  const d = parsed.data;

  try {
    const row = await prisma.producto.update({
      where: { id },
      data: {
        nombre: d.name,
        descripcion: d.description || null,
        precio: d.price,
        stock: d.stock,
        estado: d.status,
        imagen: d.image || null,
        destacado: d.featured,
        categoriaId: d.categoryId,
      },
      include,
    });
    return NextResponse.json(toProduct(row));
  } catch (error) {
    const code = prismaErrorCode(error);
    if (code === "P2025") return jsonError(aroma.errors.notFound, 404);
    if (code === "P2002") return jsonError(aroma.errors.duplicated, 409);
    if (code === "P2003") return jsonError(aroma.errors.invalidCategory, 422);
    return jsonError(aroma.errors.updated, 500);
  }
}

// DELETE /api/producto/:id -> elimina (si no se ha vendido)
export async function DELETE(_request: Request, { params }: Context) {
  const id = parseId((await params).id);
  if (id === null) return jsonError(aroma.errors.notFound, 404);

  try {
    await prisma.producto.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    const code = prismaErrorCode(error);
    if (code === "P2025") return jsonError(aroma.errors.notFound, 404);
    if (code === "P2003") return jsonError(aroma.errors.deleteInUse, 409);
    return jsonError(aroma.errors.deleted, 500);
  }
}
