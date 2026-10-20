import { NextResponse } from "next/server";

// Respuesta de error con el formato { message } que lee apiFetch
export function jsonError(message: string, status: number) {
  return NextResponse.json({ message }, { status });
}

// Código de error de Prisma (P2002 = único repetido, P2003 = tiene relaciones, P2025 = no existe)
export function prismaErrorCode(error: unknown): string | undefined {
  if (typeof error === "object" && error !== null && "code" in error) {
    const code = (error as { code: unknown }).code;
    return typeof code === "string" ? code : undefined;
  }
  return undefined;
}

// Convierte el id de la URL a número entero seguro; si no es válido devuelve null
export function parseId(raw: string): number | null {
  if (!/^\d+$/.test(raw)) return null;
  const id = Number(raw);
  return Number.isSafeInteger(id) ? id : null;
}
