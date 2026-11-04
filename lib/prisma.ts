import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/src/generated/prisma/client";

// Una sola conexión compartida (evita abrir una nueva en cada recarga en desarrollo)
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function crearCliente() {
  // Se usa el enlace de sesión (puerto 5432) de Supabase
  const connectionString = process.env.DIRECT_URL ?? process.env.DATABASE_URL;
  const adapter = new PrismaPg({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? crearCliente();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
