"use client";

import EncabezadoSeccion from "@/components/EncabezadoSeccion";
import FiltrosBusqueda from "@/components/FiltrosBusqueda";
import TableAroma from "@/components/TableAroma";
import Badge from "@/components/Badge";
import Boton from "@/components/Boton";
import { pedidosUsuario } from "@/components/datosEstaticos";

const columnas = [
  { key: "orden", etiqueta: "ORDEN" },
  { key: "fecha", etiqueta: "FECHA" },
  { key: "valor", etiqueta: "VALOR" },
  { key: "estado", etiqueta: "ESTADO" },
  { key: "opciones", etiqueta: "OPCIONES", alineacion: "end" as const },
];

export default function Page() {
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
