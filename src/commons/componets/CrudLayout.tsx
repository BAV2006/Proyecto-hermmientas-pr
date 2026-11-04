"use client";

import type { ReactNode } from "react";
import EncabezadoSeccion from "./EncabezadoSeccion";
import Buscador from "./Buscador";
import CardAroma from "./CardAroma";
import Boton from "./Boton";
import ModalConfirmarEliminar from "./ModalConfirmarEliminar";
import FormMessages from "./FormMessages";
import { aroma } from "@/src/commons/localizations";

interface Props {
  icon: string;
  title: string;
  subtitle: string;
  newLabel: string;
  newHref: string;
  searchPlaceholder: string;
  search: string;
  onSearch: (value: string) => void;
  loading: boolean;
  loadError: string | null;
  notice: string | null;
  actionError: string | null;
  isEmpty: boolean;
  currentPage: number;
  totalPages: number;
  onPage: (page: number) => void;
  deleteTarget: { entity: string; name: string } | null;
  deleting: boolean;
  onCancelDelete: () => void;
  onConfirmDelete: () => void;
  children: ReactNode; // la tabla
}

// Estructura común de las listas: encabezado, buscador, estados, tabla, paginación y borrado
export default function CrudLayout(props: Props) {
  return (
    <>
      <EncabezadoSeccion
        icono={props.icon}
        titulo={props.title}
        subtitulo={props.subtitle}
        accion={props.newLabel}
        accionHref={props.newHref}
      />

      <FormMessages error={props.actionError} success={props.notice} />

      <CardAroma>
        <Buscador
          placeholder={props.searchPlaceholder}
          value={props.search}
          onChange={props.onSearch}
        />
      </CardAroma>

      {props.loading ? (
        <p className="text-sm text-gray-500">{aroma.messages.loading}...</p>
      ) : props.loadError ? (
        <FormMessages error={props.loadError} />
      ) : props.isEmpty ? (
        <CardAroma>
          <p className="text-center text-sm text-gray-500">{aroma.messages.withoutRows}</p>
        </CardAroma>
      ) : (
        <>
          {props.children}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <Boton
              variante="secundario"
              tamano="xs"
              disabled={props.currentPage === 1}
              onClick={() => props.onPage(props.currentPage - 1)}
            >
              {aroma.labels.previous}
            </Boton>
            <span>
              {aroma.labels.page} {props.currentPage} {aroma.labels.of} {props.totalPages}
            </span>
            <Boton
              variante="secundario"
              tamano="xs"
              disabled={props.currentPage === props.totalPages}
              onClick={() => props.onPage(props.currentPage + 1)}
            >
              {aroma.labels.next}
            </Boton>
          </div>
        </>
      )}

      {props.deleteTarget && (
        <ModalConfirmarEliminar
          overlay
          entidad={props.deleteTarget.entity}
          nombre={props.deleteTarget.name}
          procesando={props.deleting}
          onCancel={props.onCancelDelete}
          onConfirm={props.onConfirmDelete}
        />
      )}
    </>
  );
}
