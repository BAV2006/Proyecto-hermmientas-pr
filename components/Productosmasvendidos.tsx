"use client";

import CardAroma from "./CardAroma";
import TableAroma from "./TableAroma";
import { masVendidos, formatoPrecio } from "./datosEstaticos";

const columnas = [
  { key: "puesto", etiqueta: "PRODUCTO" },
  { key: "nombre", etiqueta: "NOMBRE" },
  { key: "vendidos", etiqueta: "VENDIDOS", alineacion: "end" as const },
  { key: "stock", etiqueta: "STOCK", alineacion: "end" as const },
  { key: "precio", etiqueta: "PRECIO", alineacion: "end" as const },
];

export default function Productosmasvendidos() {
  return (
    <CardAroma titulo="Productos más vendidos" icono="trophy">
      <TableAroma
        etiqueta="Productos más vendidos"
        columnas={columnas}
        filas={masVendidos}
        renderCelda={(p, key) => {
          if (key === "puesto")
            return (
              <span className="flex items-center gap-2">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-gray-100 text-[10px] font-bold text-gray-500">
                  {p.id}
                </span>
                <span className="grid h-8 w-8 place-items-center rounded-md bg-mint/60 text-lg">{p.emoji}</span>
              </span>
            );
          if (key === "nombre")
            return (
              <span>
                <span className="block font-semibold">{p.nombre}</span>
                <span className="block text-xs text-gray-400">{p.categoria}</span>
              </span>
            );
          if (key === "precio") return <span className="font-semibold">{formatoPrecio(p.precio)}</span>;
          if (key === "stock")
            return <span className={p.stockBajo ? "font-semibold text-orange-500" : ""}>{p.stock}</span>;
          return <span>{p[key]}</span>;
        }}
      />
    </CardAroma>
  );
}
