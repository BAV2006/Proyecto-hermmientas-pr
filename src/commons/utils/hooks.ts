import { useState } from "react";
import useSWR, { mutate } from "swr";
import { apiFetch } from "@/src/commons/utils/api";
import { aroma } from "@/src/commons/localizations";
import { PAGE_SIZE } from "@/src/commons/constants";
import type { ApiResponse } from "@/src/commons/interfaces";

// Lector de SWR: llama al endpoint con apiFetch y entrega solo el campo `data`
async function fetchList<T>(url: string): Promise<T[]> {
  const res = await apiFetch<ApiResponse<T[]>>(url);
  return res.data ?? [];
}

// Lista desde una API (GET). La URL es la "llave" de la caché de SWR:
// si ya hay datos guardados los muestra al instante y los revalida en segundo plano.
export function useApiList<T>(url: string) {
  const { data, error, isLoading } = useSWR<T[]>(url, (key: string) => fetchList<T>(key));

  return {
    items: data ?? [],
    loading: isLoading,
    error: error ? (error instanceof Error ? error.message : aroma.errors.load) : null,
  };
}

// Búsqueda + paginación del lado del cliente
export function useSearchPaging<T>(
  items: T[],
  matches: (item: T, query: string) => boolean
) {
  const [search, setSearchState] = useState("");
  const [page, setPage] = useState(1);

  const filtered = items.filter((item) => matches(item, search.trim().toLowerCase()));
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const rows = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const setSearch = (value: string) => {
    setSearchState(value);
    setPage(1);
  };

  return { search, setSearch, rows, total: filtered.length, currentPage, totalPages, setPage };
}

// Confirmar y ejecutar un DELETE sobre `${baseUrl}/${id}`; después renueva la caché de la lista
export function useDeleteDialog<T extends { id: number }>(baseUrl: string) {
  const [target, setTarget] = useState<T | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const confirm = async () => {
    if (!target || deleting) return; // evita doble clic
    try {
      setDeleting(true);
      await apiFetch(`${baseUrl}/${target.id}`, { method: "DELETE" });
      await mutate(baseUrl); // vuelve a pedir la lista
      setError(null);
      setNotice(aroma.success.deleted);
    } catch (e) {
      setNotice(null);
      setError(e instanceof Error ? e.message : aroma.errors.deleted);
    } finally {
      setDeleting(false);
      setTarget(null);
    }
  };

  return { target, setTarget, deleting, notice, error, confirm };
}
