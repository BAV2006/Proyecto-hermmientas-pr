import { NextResponse } from 'next/server';
import { aroma } from '@/src/commons/localizations';
import { AppError } from './errors';
import { logger } from './logger';

// Respuesta de error con el formato { message } que lee apiFetch
export function errorResponse(message: string, status: number) {
  return NextResponse.json({ message }, { status });
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
