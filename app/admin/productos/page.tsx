"use client";

import EncabezadoSeccion from "@/components/EncabezadoSeccion";
import Buscador from "@/components/Buscador";
import CardAroma from "@/components/CardAroma";
import TableAroma from "@/components/TableAroma";
import Badge from "@/components/Badge";
import AccionesFila from "@/components/AccionesFila";
import { productos, formatoPrecio } from "@/components/datosEstaticos";

const columnas = [
  { key: "id", etiqueta: "ID" },
  { key: "categoria", etiqueta: "CATEGORÍA" },
  { key: "nombre", etiqueta: "NOMBRE" },
  { key: "precio", etiqueta: "PRECIO", alineacion: "end" as const },
  { key: "stock", etiqueta: "STOCK", alineacion: "end" as const },
  { key: "estado", etiqueta: "ESTADO" },
  { key: "acciones", etiqueta: "ACCIONES", alineacion: "end" as const },
];

export default function Page() {
  return (
    <>
      <EncabezadoSeccion icono="package" titulo="Productos" subtitulo="Catálogo de productos de la cafetería" accion="Nuevo Producto" />
      <CardAroma><Buscador placeholder="Buscar producto o categoría..." /></CardAroma>
      <TableAroma
        etiqueta="Catálogo de productos"
        columnas={columnas}
        filas={productos}
        renderCelda={(p, key) => {
          if (key === "id") return <span className="text-gray-500">#{p.id}</span>;
          if (key === "categoria") return <span className="text-gray-500">{p.categoria}</span>;
          if (key === "nombre")
            return (
              <span className="flex items-center gap-3 font-semibold">
                <span className="grid h-8 w-8 place-items-center rounded-md bg-mint/60 text-lg">{p.emoji}</span>
                {p.nombre}
              </span>
            );
          if (key === "precio") return <span className="font-semibold">{formatoPrecio(p.precio)}</span>;
          if (key === "stock")
            return <span className={p.stock <= 15 ? "font-semibold text-orange-500" : ""}>{p.stock}</span>;
          if (key === "estado") return <Badge tipo={p.estado.toLowerCase()} punto>{p.estado}</Badge>;
          return <AccionesFila />;
        }}
      />
    </>
  );
}
