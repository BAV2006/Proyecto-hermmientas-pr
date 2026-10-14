"use client";

import EncabezadoSeccion from "@/components/EncabezadoSeccion";
import Buscador from "@/components/Buscador";
import CardAroma from "@/components/CardAroma";
import TableAroma from "@/components/TableAroma";
import Badge from "@/components/Badge";
import AccionesFila from "@/components/AccionesFila";
import { usuarios } from "@/components/datosEstaticos";

const columnas = [
  { key: "id", etiqueta: "ID" },
  { key: "nombre", etiqueta: "NOMBRE" },
  { key: "email", etiqueta: "EMAIL" },
  { key: "rol", etiqueta: "ROL" },
  { key: "estado", etiqueta: "ESTADO" },
  { key: "acciones", etiqueta: "ACCIONES", alineacion: "end" as const },
];

export default function Page() {
  return (
    <>
      <EncabezadoSeccion icono="users" titulo="Usuarios" subtitulo="Gestión del personal del sistema" accion="Nuevo Usuario" />
      <CardAroma><Buscador placeholder="Buscar por nombre o correo..." /></CardAroma>
      <TableAroma
        etiqueta="Usuarios del sistema"
        columnas={columnas}
        filas={usuarios}
        renderCelda={(u, key) => {
          if (key === "id") return <span className="text-gray-500">#{u.id}</span>;
          if (key === "nombre")
            return (
              <span className="flex items-center gap-3 font-semibold">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-navy text-xs text-white">
                  {u.nombre.split(" ").map((p: string) => p[0]).join("")}
                </span>
                {u.nombre}
              </span>
            );
          if (key === "rol") return <Badge tipo={u.rol.toLowerCase()}>{u.rol}</Badge>;
          if (key === "estado") return <Badge tipo={u.estado.toLowerCase()} punto>{u.estado}</Badge>;
          if (key === "acciones") return <AccionesFila />;
          return <span className="text-gray-500">{u[key]}</span>;
        }}
      />
    </>
  );
}
