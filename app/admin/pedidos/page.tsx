"use client";

import EncabezadoSeccion from "@/components/EncabezadoSeccion";
import TarjetaFacturacion from "@/components/TarjetaFacturacion";
import FiltrosBusqueda from "@/components/FiltrosBusqueda";
import TableAroma from "@/components/TableAroma";
import Badge from "@/components/Badge";
import Boton from "@/components/Boton";
import { pedidos } from "@/components/pedidosData";
import { formatoPrecio } from "@/components/datosEstaticos";

const columnas = [
  { key: "id", etiqueta: "ID ORDEN" },
  { key: "fecha", etiqueta: "FECHA" },
  { key: "cliente", etiqueta: "CLIENTE" },
  { key: "ubicacion", etiqueta: "UBICACIÓN" },
  { key: "valor", etiqueta: "VALOR", alineacion: "end" as const },
  { key: "estado", etiqueta: "ESTADO" },
  { key: "opciones", etiqueta: "OPCIONES", alineacion: "end" as const },
];

export default function Page() {
  return (
    <>
      <EncabezadoSeccion icono="clipboard" titulo="Pedidos" subtitulo="Gestión y seguimiento de pedidos del día" />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <TarjetaFacturacion icono="bag" valor="7" etiqueta="Total Pedidos" tono="mint" horizontal />
        <TarjetaFacturacion icono="check" valor="2" etiqueta="Entregados" tono="verde" horizontal />
        <TarjetaFacturacion icono="clock" valor="2" etiqueta="Pendientes" tono="azul" horizontal />
        <TarjetaFacturacion icono="cancel" valor="1" etiqueta="Cancelados" tono="rojo" horizontal />
      </div>
      <FiltrosBusqueda
        campos={[
          { etiqueta: "Estado", tipo: "select", opciones: ["Todos", "Solicitado", "Pendiente", "Entregado", "Cancelado"] },
          { etiqueta: "Fecha", tipo: "date" },
          { etiqueta: "Cliente", tipo: "text", placeholder: "Nombre del cliente" },
          { etiqueta: "Buscar", tipo: "search", placeholder: "ID o cliente" },
        ]}
      />
      <TableAroma
        etiqueta="Pedidos del día"
        columnas={columnas}
        filas={pedidos}
        renderCelda={(p, key) => {
          if (key === "id") return <span className="font-semibold">#{p.id}</span>;
          if (key === "fecha") return <span className="text-gray-500">{p.fecha}</span>;
          if (key === "cliente") return <span className="font-semibold">{p.cliente}</span>;
          if (key === "ubicacion") return <span className="text-gray-500">{p.ubicacion}</span>;
          if (key === "valor") return <span className="font-semibold">{formatoPrecio(p.total)}</span>;
          if (key === "estado") return <Badge tipo={p.estado.toLowerCase()}>{p.estado}</Badge>;
          return (
            <span className="flex justify-end gap-1.5">
              {p.estado === "Solicitado" && (
                <>
                  <Boton variante="exito" tamano="xs" icono="check">Aceptar</Boton>
                  <Boton variante="peligroSuave" tamano="xs" icono="x">Rechazar</Boton>
                </>
              )}
              <Boton variante="suave" tamano="xs" icono="eye">Ver</Boton>
            </span>
          );
        }}
      />
    </>
  );
}
