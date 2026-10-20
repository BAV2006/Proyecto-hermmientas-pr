"use client";

import type { ReactNode } from "react";
import { Table } from "@heroui/react";

export interface Columna {
  key: string;
  etiqueta: string;
  alineacion?: "start" | "end" | "center";
}

interface Props {
  etiqueta: string;
  columnas: Columna[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filas: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderCelda: (fila: any, key: string) => ReactNode;
}

const alineaciones = { start: "text-left", end: "text-right", center: "text-center" };

// Tabla reutilizable (HeroUI Table): recibe columnas, filas y cómo pintar cada celda
export default function TableAroma({ etiqueta, columnas, filas, renderCelda }: Props) {
  return (
    <div className="w-full min-w-0 overflow-hidden rounded-xl border border-black/5 bg-white shadow-sm">
      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label={etiqueta} className="min-w-[640px]">
            <Table.Header>
              {columnas.map((c, i) => (
                <Table.Column
                  key={c.key}
                  isRowHeader={i === 0}
                  className={`text-xs font-semibold text-gray-500 ${alineaciones[c.alineacion ?? "start"]}`}
                >
                  {c.etiqueta}
                </Table.Column>
              ))}
            </Table.Header>
            <Table.Body>
              {filas.map((fila, idx) => (
                <Table.Row key={fila.id ?? idx} id={String(fila.id ?? idx)}>
                  {columnas.map((c) => (
                    <Table.Cell key={c.key} className="text-sm">
                      {renderCelda(fila, c.key)}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
}
