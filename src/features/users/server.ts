import { prisma } from "@/src/commons/utils/prisma";

// Solo estas columnas salen de la base de datos: la contraseña nunca se consulta
export const userSelect = {
  id: true,
  nombre: true,
  correo: true,
  rol: true,
  estado: true,
} as const;

// Busca a un miembro del personal (los clientes no se administran aquí)
export async function findStaff(id: number) {
  const row = await prisma.usuario.findUnique({ where: { id }, select: userSelect });
  return row && row.rol !== "CLIENTE" ? row : null;
}

// ¿Es el único administrador activo? (para no dejar el sistema sin administrador)
export async function isLastActiveAdmin(id: number) {
  const target = await prisma.usuario.findUnique({
    where: { id },
    select: { rol: true, estado: true },
  });
  if (!target || target.rol !== "ADMINISTRADOR" || target.estado !== "ACTIVO") return false;

  const others = await prisma.usuario.count({
    where: { rol: "ADMINISTRADOR", estado: "ACTIVO", NOT: { id } },
  });
  return others === 0;
}
