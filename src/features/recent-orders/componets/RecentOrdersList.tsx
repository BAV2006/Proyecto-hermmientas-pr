"use client";

import EncabezadoSeccion from "@/src/commons/componets/EncabezadoSeccion";
import FiltrosBusqueda from "@/src/commons/componets/FiltrosBusqueda";
import TableAroma from "@/src/commons/componets/TableAroma";
import Badge from "@/src/commons/componets/Badge";
import Boton from "@/src/commons/componets/Boton";
import { pedidosUsuario } from "@/src/commons/data/datosEstaticos";

const columnas = [
  { key: "orden", etiqueta: "ORDEN" },
  { key: "fecha", etiqueta: "FECHA" },
  { key: "valor", etiqueta: "VALOR" },
  { key: "estado", etiqueta: "ESTADO" },
  { key: "opciones", etiqueta: "OPCIONES", alineacion: "end" as const },
];

export default function RecentOrdersList() {
  return (
    <div className="flex flex-col gap-4">
      <EncabezadoSeccion titulo="Últimos Pedidos" subtitulo="Consulta el historial de tus pedidos y vuelve a realizarlos." />
      <FiltrosBusqueda
        campos={[
          { etiqueta: "Estado", tipo: "select", opciones: ["Todos", "Solicitado", "Pendiente", "Entregado", "Cancelado"] },
          { etiqueta: "Fecha", tipo: "date" },
        ]}
      />
      <TableAroma
        etiqueta="Historial de pedidos"
        columnas={columnas}
        filas={pedidosUsuario}
        renderCelda={(p, key) => {
          if (key === "orden") return <span className="font-semibold">{p.orden}</span>;
          if (key === "fecha") return <span className="text-gray-500">{p.fecha}</span>;
          if (key === "valor") return <span className="font-semibold">${p.valor.toFixed(2)}</span>;
          if (key === "estado") return <Badge tipo={p.estado.toLowerCase()}>{p.estado}</Badge>;
          return (
            <span className="flex justify-end">
              <Boton variante="primario" tamano="xs" icono="repeat" iconoDerecha="chevron">Volver a pedir</Boton>
            </span>
          );
        }}
      />
    </div>
  );
}
