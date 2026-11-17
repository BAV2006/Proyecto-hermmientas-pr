import type { IProduct, Status } from "@/src/commons/interfaces";

// Fila de la tabla "productos" (con su categoría) -> objeto del front
interface ProductoRow {
  id: number;
  nombre: string;
  descripcion: string | null;
  precio: number;
  stock: number;
  stockMinimo: number;
  destacado: boolean;
  imagen: string | null;
  estado: Status;
  categoriaId: number;
  categoria: { nombre: string };
}

export const toProduct = (row: ProductoRow): IProduct => ({
  id: row.id,
  name: row.nombre,
  description: row.descripcion ?? "",
  price: row.precio,
  stock: row.stock,
  minStock: row.stockMinimo,
  featured: row.destacado,
  image: row.imagen ?? "",
  status: row.estado,
  categoryId: row.categoriaId,
  categoryName: row.categoria.nombre,
});
