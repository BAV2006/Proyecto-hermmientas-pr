import { NextResponse } from 'next/server';
import { aroma } from '@/src/commons/localizations';
import { AppError } from './errors';
import { logger } from './logger';

// Respuesta correcta: { success: true, data }
export function successResponse<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

// Respuesta de error: { success: false, message } (apiFetch lee el message)
export function errorResponse(message: string, status: number) {
  return NextResponse.json({ success: false, message }, { status });
}

// Convierte cualquier error del servidor en una respuesta HTTP
export function handleError(error: unknown, module: string) {
  if (error instanceof AppError) {
    return errorResponse(error.message, error.status);
  }
  logger({ error: error as Error, module });
  return errorResponse(aroma.errors.serverError, 500);
}

// Convierte el id de la URL a número entero seguro; si no es válido devuelve null
export function parseId(raw: string): number | null {
  if (!/^\d+$/.test(raw)) return null;
  const id = Number(raw);
  return Number.isSafeInteger(id) ? id : null;
}
