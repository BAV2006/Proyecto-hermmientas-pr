// Error esperado (duplicado, no existe, en uso...): se responde con su mensaje y su código HTTP
export class AppError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'AppError';
    this.status = status;
  }
}

// Código de error de Prisma (P2002 = único repetido, P2003 = tiene relaciones, P2025 = no existe)
export function prismaErrorCode(error: unknown): string | undefined {
  if (typeof error === 'object' && error !== null && 'code' in error) {
    const code = (error as { code: unknown }).code;
    return typeof code === 'string' ? code : undefined;
  }
  return undefined;
}
