"use client";

import type { ReactNode } from "react";
import { SWRConfig } from "swr";
import { apiFetch } from "@/src/commons/utils/api";

// Configuración global de SWR: todas las lecturas (GET) usan apiFetch y comparten la caché
export default function SwrProvider({ children }: { children: ReactNode }) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => apiFetch(url),
        revalidateOnFocus: false, // no vuelve a pedir los datos cada vez que cambias de pestaña
        shouldRetryOnError: false, // si la API falla, muestra el error y no reintenta en bucle
        dedupingInterval: 2000, // evita pedir lo mismo varias veces en 2 segundos
      }}
    >
      {children}
    </SWRConfig>
  );
}
