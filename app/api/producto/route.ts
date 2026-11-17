import { NextResponse, connection } from "next/server";
import { prisma } from "@/src/commons/utils/prisma";
import { jsonError, prismaErrorCode } from "@/src/commons/utils/api-response";
import { aroma } from "@/src/commons/localizations";
import { productSchema } from "@/src/features/products/schema";
import { toProduct } from "@/src/features/products/mapper";

const include = { categoria: { select: { nombre: true } } } as const;

// GET /api/producto -> lista de productos con su categoría
export async function GET() {
  await connection();
  try {
    const rows = await prisma.producto.findMany({ include, orderBy: { id: "asc" } });
    return NextResponse.json(rows.map(toProduct));
  } catch {
    return jsonError(aroma.errors.serverError, 500);
  }
}

// POST /api/producto -> crea un producto
export async function POST(request: Request) {
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
    const row = await prisma.producto.create({
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
    return NextResponse.json(toProduct(row), { status: 201 });
  } catch (error) {
    const code = prismaErrorCode(error);
    if (code === "P2002") return jsonError(aroma.errors.duplicated, 409);
    if (code === "P2003") return jsonError(aroma.errors.invalidCategory, 422);
    return jsonError(aroma.errors.created, 500);
  }
}
