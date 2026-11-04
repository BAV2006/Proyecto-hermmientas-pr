import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "@/src/commons/utils/api";
import { aroma } from "@/src/commons/localizations";
import { PAGE_SIZE } from "@/src/commons/constants";

// Carga una lista desde una API (GET) con estados de carga y error
export function useApiList<T>(url: string) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setItems(await apiFetch<T[]>(url));
    } catch (e) {
      setError(e instanceof Error ? e.message : aroma.errors.load);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    void load();
  }, [load]);

  return { items, setItems, loading, error };
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

// Confirmar y ejecutar un DELETE sobre `${baseUrl}/${id}`
export function useDeleteDialog<T extends { id: number }>(
  baseUrl: string,
  onRemoved: (id: number) => void
) {
  const [target, setTarget] = useState<T | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const confirm = async () => {
    if (!target) return;
    try {
      setDeleting(true);
      await apiFetch(`${baseUrl}/${target.id}`, { method: "DELETE" });
      onRemoved(target.id);
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
