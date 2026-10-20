import { NextResponse, connection } from "next/server";
import { prisma } from "@/src/commons/utils/prisma";
import { jsonError, prismaErrorCode } from "@/src/commons/utils/api-response";
import { aroma } from "@/src/commons/localizations";
import { categorySchema } from "@/src/features/category/schema";
import { toCategory } from "@/src/features/category/mapper";

// GET /api/categoria -> lista de categorías
export async function GET() {
  await connection();
  try {
    const rows = await prisma.categoria.findMany({ orderBy: { id: "asc" } });
    return NextResponse.json(rows.map(toCategory));
  } catch {
    return jsonError(aroma.errors.serverError, 500);
  }
}

// POST /api/categoria -> crea una categoría
export async function POST(request: Request) {
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
    // evita duplicados aunque cambie mayúsculas/minúsculas
    const exists = await prisma.categoria.findFirst({
      where: { nombre: { equals: name, mode: "insensitive" } },
    });
    if (exists) return jsonError(aroma.errors.duplicated, 409);

    const row = await prisma.categoria.create({
      data: { nombre: name, estado: status },
    });
    return NextResponse.json(toCategory(row), { status: 201 });
  } catch (error) {
    if (prismaErrorCode(error) === "P2002") {
      return jsonError(aroma.errors.duplicated, 409);
    }
    return jsonError(aroma.errors.created, 500);
  }
}
