"use client";

import EncabezadoSeccion from "@/components/EncabezadoSeccion";
import TarjetaFacturacion from "@/components/TarjetaFacturacion";
import FiltrosBusqueda from "@/components/FiltrosBusqueda";
import TableAroma from "@/components/TableAroma";
import Badge from "@/components/Badge";
import Boton from "@/components/Boton";
import { facturas, totalFacturado } from "@/components/pedidosData";
import { formatoPrecio } from "@/components/datosEstaticos";

const columnas = [
  { key: "id", etiqueta: "ID ORDEN" },
  { key: "fecha", etiqueta: "FECHA" },
  { key: "cliente", etiqueta: "CLIENTE" },
  { key: "ubicacion", etiqueta: "UBICACIÓN" },
  { key: "valor", etiqueta: "VALOR", alineacion: "end" as const },
  { key: "estado", etiqueta: "ESTADO" },
  { key: "detalles", etiqueta: "DETALLES", alineacion: "end" as const },
];

export default function Page() {
  return (
    <>
      <EncabezadoSeccion icono="receipt" titulo="Facturación" subtitulo="Órdenes entregadas y facturas generadas" />
      <div className="grid gap-3 md:grid-cols-3">
        <TarjetaFacturacion icono="file" valor={String(facturas.length)} etiqueta="Facturas del día" tono="mint" horizontal />
        <TarjetaFacturacion icono="receipt" valor={formatoPrecio(totalFacturado)} etiqueta="Total facturado" tono="mint" horizontal />
        <TarjetaFacturacion icono="calendar" valor="2026-08-26" etiqueta="Fecha del reporte" tono="lemon" horizontal />
      </div>
      <FiltrosBusqueda
        campos={[
          { etiqueta: "Fecha", tipo: "date" },
          { etiqueta: "Cliente", tipo: "text", placeholder: "Nombre del cliente" },
          { etiqueta: "Buscar", tipo: "search", placeholder: "ID o cliente" },
        ]}
      />
      <TableAroma
        etiqueta="Facturas generadas"
        columnas={columnas}
        filas={facturas}
        renderCelda={(f, key) => {
          if (key === "id") return <span className="font-semibold">#{f.id}</span>;
          if (key === "fecha") return <span className="text-gray-500">{f.fecha}</span>;
          if (key === "cliente") return <span className="font-semibold">{f.cliente}</span>;
          if (key === "ubicacion") return <span className="text-gray-500">{f.ubicacion}</span>;
          if (key === "valor") return <span className="font-semibold">{formatoPrecio(f.total)}</span>;
          if (key === "estado") return <Badge tipo="entregado" punto>Entregado</Badge>;
          return (
            <span className="flex justify-end">
              <Boton variante="suave" tamano="xs" icono="eye">Ver detalles</Boton>
            </span>
          );
        }}
      />
    </>
  );
}
