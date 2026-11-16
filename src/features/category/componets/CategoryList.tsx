"use client";

import CrudLayout from "@/src/commons/componets/CrudLayout";
import TableAroma from "@/src/commons/componets/TableAroma";
import Badge from "@/src/commons/componets/Badge";
import AccionesFila from "@/src/commons/componets/AccionesFila";
import useSWR from "swr";
import { aroma } from "@/src/commons/localizations";
import { CATEGORY_API } from "@/src/commons/constants";
import { useApiList, useDeleteDialog, useSearchPaging } from "@/src/commons/utils/hooks";
import type { ICategory } from "@/src/commons/interfaces";
import { apiFetch } from "@/src/commons/utils/api";



const columns = [
  { key: "id", etiqueta: aroma.labels.id.toUpperCase() },
  { key: "name", etiqueta: aroma.labels.name.toUpperCase() },
  { key: "status", etiqueta: aroma.labels.status.toUpperCase() },
  { key: "actions", etiqueta: aroma.labels.actions.toUpperCase(), alineacion: "end" as const },
];

export default function CategoryList() {
  const { items, setItems, loading, error } = useApiList<ICategory>(CATEGORY_API);
  const paging = useSearchPaging(items, (c, q) => c.name.toLowerCase().includes(q));
  const del = useDeleteDialog<ICategory>(CATEGORY_API, (id) =>
    setItems((prev) => prev.filter((c) => c.id !== id))
  );

  return (
    <CrudLayout
      icon="grid"
      title={aroma.category.title}
      subtitle={aroma.category.subtitle}
      newLabel={aroma.category.new}
      newHref={`${aroma.navAdmin.categoryurl}/${aroma.commons.newUrl}`}
      searchPlaceholder={aroma.category.searchPlaceholder}
      search={paging.search}
      onSearch={paging.setSearch}
      loading={loading}
      loadError={error}
      notice={del.notice}
      actionError={del.error}
      isEmpty={paging.total === 0}
      currentPage={paging.currentPage}
      totalPages={paging.totalPages}
      onPage={paging.setPage}
      deleteTarget={del.target ? { entity: aroma.category.entity, name: del.target.name } : null}
      deleting={del.deleting}
      onCancelDelete={() => del.setTarget(null)}
      onConfirmDelete={del.confirm}
    >
      <TableAroma
        etiqueta={aroma.category.title}
        columnas={columns}
        filas={paging.rows}
        renderCelda={(c: ICategory, key) => {
          if (key === "id") return <span className="text-gray-500">#{c.id}</span>;
          if (key === "name") return <span className="font-semibold">{c.name}</span>;
          if (key === "status")
            return (
              <Badge tipo={c.status.toLowerCase()} punto>
                {c.status === "ACTIVO" ? aroma.labels.active : aroma.labels.inactive}
              </Badge>
            );
          return (
            <AccionesFila
              editHref={`${aroma.navAdmin.categoryurl}/${c.id}`}
              onDelete={() => del.setTarget(c)}
            />
          );
        }}
      />
    </CrudLayout>
  );
}
