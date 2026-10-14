"use client";

import EncabezadoSeccion from "@/components/EncabezadoSeccion";
import Buscador from "@/components/Buscador";
import CardAroma from "@/components/CardAroma";
import TableAroma from "@/components/TableAroma";
import Badge from "@/components/Badge";
import AccionesFila from "@/components/AccionesFila";
import { categorias } from "@/components/datosEstaticos";

const columnas = [
  { key: "id", etiqueta: "ID" },
  { key: "nombre", etiqueta: "NOMBRE" },
  { key: "estado", etiqueta: "ESTADO" },
  { key: "acciones", etiqueta: "ACCIONES", alineacion: "end" as const },
];

export default function Page() {
  return (
    <>
      <EncabezadoSeccion icono="grid" titulo="Categorías" subtitulo="Organiza los productos por categoría" accion="Nueva Categoría" />
      <CardAroma><Buscador placeholder="Buscar categoría..." /></CardAroma>
      <TableAroma
        etiqueta="Categorías"
        columnas={columnas}
        filas={categorias}
        renderCelda={(c, key) => {
          if (key === "id") return <span className="text-gray-500">#{c.id}</span>;
          if (key === "nombre") return <span className="font-semibold">{c.nombre}</span>;
          if (key === "estado") return <Badge tipo={c.estado.toLowerCase()} punto>{c.estado}</Badge>;
          return <AccionesFila />;
        }}
      />
    </>
  );
}
