import type { IUser, StaffRole, Status } from "@/src/commons/interfaces";

// Fila de la tabla "usuarios" -> objeto del front (nunca incluye la contraseña)
interface UsuarioRow {
  id: number;
  nombre: string;
  correo: string;
  rol: string;
  estado: Status;
}

export const toUser = (row: UsuarioRow): IUser => ({
  id: row.id,
  name: row.nombre,
  email: row.correo,
  role: row.rol as StaffRole,
  status: row.estado,
});
