"use client";

import CrudLayout from "@/src/commons/componets/CrudLayout";
import TableAroma from "@/src/commons/componets/TableAroma";
import Badge from "@/src/commons/componets/Badge";
import AccionesFila from "@/src/commons/componets/AccionesFila";
import { aroma } from "@/src/commons/localizations";
import { PRODUCT_API } from "@/src/commons/constants";
import { formatoPrecio } from "@/src/commons/data/datosEstaticos";
import { useApiList, useDeleteDialog, useSearchPaging } from "@/src/commons/utils/hooks";
import type { IProduct } from "@/src/commons/interfaces";

const columns = [
  { key: "id", etiqueta: aroma.labels.id.toUpperCase() },
  { key: "category", etiqueta: aroma.labels.category.toUpperCase() },
  { key: "name", etiqueta: aroma.labels.name.toUpperCase() },
  { key: "price", etiqueta: "PRECIO", alineacion: "end" as const },
  { key: "stock", etiqueta: aroma.labels.stock.toUpperCase(), alineacion: "end" as const },
  { key: "status", etiqueta: aroma.labels.status.toUpperCase() },
  { key: "actions", etiqueta: aroma.labels.actions.toUpperCase(), alineacion: "end" as const },
];

const isUrl = (value: string) => /^https?:\/\//i.test(value);

export default function ProductList() {
  const { items, setItems, loading, error } = useApiList<IProduct>(PRODUCT_API);
  const paging = useSearchPaging(
    items,
    (p, q) => p.name.toLowerCase().includes(q) || p.categoryName.toLowerCase().includes(q)
  );
  const del = useDeleteDialog<IProduct>(PRODUCT_API, (id) =>
    setItems((prev) => prev.filter((p) => p.id !== id))
  );

  return (
    <CrudLayout
      icon="package"
      title={aroma.products.title}
      subtitle={aroma.products.subtitle}
      newLabel={aroma.products.new}
      newHref={`${aroma.navAdmin.producturl}/${aroma.commons.newUrl}`}
      searchPlaceholder={aroma.products.searchPlaceholder}
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
      deleteTarget={del.target ? { entity: aroma.products.entity, name: del.target.name } : null}
      deleting={del.deleting}
      onCancelDelete={() => del.setTarget(null)}
      onConfirmDelete={del.confirm}
    >
      <TableAroma
        etiqueta={aroma.products.title}
        columnas={columns}
        filas={paging.rows}
        renderCelda={(p: IProduct, key) => {
          if (key === "id") return <span className="text-gray-500">#{p.id}</span>;
          if (key === "category") return <span className="text-gray-500">{p.categoryName}</span>;
          if (key === "name")
            return (
              <span className="flex items-center gap-3 font-semibold">
                {isUrl(p.image) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.image} alt={p.name} className="h-8 w-8 rounded-md object-cover" />
                ) : (
                  <span className="grid h-8 w-8 place-items-center rounded-md bg-mint/60 text-lg">
                    {p.image || "☕"}
                  </span>
                )}
                {p.name}
              </span>
            );
          if (key === "price") return <span className="font-semibold">{formatoPrecio(p.price)}</span>;
          if (key === "stock")
            return (
              <span className={p.stock <= p.minStock ? "font-semibold text-orange-500" : ""}>{p.stock}</span>
            );
          if (key === "status")
            return (
              <Badge tipo={p.status.toLowerCase()} punto>
                {p.status === "ACTIVO" ? aroma.labels.active : aroma.labels.inactive}
              </Badge>
            );
          return (
            <AccionesFila
              editHref={`${aroma.navAdmin.producturl}/${p.id}`}
              onDelete={() => del.setTarget(p)}
            />
          );
        }}
      />
    </CrudLayout>
  );
}
