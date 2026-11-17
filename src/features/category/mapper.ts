import type { ICategory, Status } from "@/src/commons/interfaces";

// Fila de la tabla "categorias" (español) -> objeto que usa el front (inglés)
interface CategoriaRow {
  id: number;
  nombre: string;
  estado: Status;
}

export const toCategory = (row: CategoriaRow): ICategory => ({
  id: row.id,
  name: row.nombre,
  status: row.estado,
});
