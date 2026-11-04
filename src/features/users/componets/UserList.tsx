"use client";

import CrudLayout from "@/src/commons/componets/CrudLayout";
import TableAroma from "@/src/commons/componets/TableAroma";
import Badge from "@/src/commons/componets/Badge";
import AccionesFila from "@/src/commons/componets/AccionesFila";
import { aroma } from "@/src/commons/localizations";
import { ROLE_OPTIONS, USER_API } from "@/src/commons/constants";
import { useApiList, useDeleteDialog, useSearchPaging } from "@/src/commons/utils/hooks";
import type { IUser } from "@/src/commons/interfaces";

const columns = [
  { key: "id", etiqueta: aroma.labels.id.toUpperCase() },
  { key: "name", etiqueta: aroma.labels.name.toUpperCase() },
  { key: "email", etiqueta: "EMAIL" },
  { key: "role", etiqueta: aroma.labels.role.toUpperCase() },
  { key: "status", etiqueta: aroma.labels.status.toUpperCase() },
  { key: "actions", etiqueta: aroma.labels.actions.toUpperCase(), alineacion: "end" as const },
];

const roleLabel = (role: string) => ROLE_OPTIONS.find((r) => r.value === role)?.label ?? role;

export default function UserList() {
  const { items, setItems, loading, error } = useApiList<IUser>(USER_API);
  const paging = useSearchPaging(
    items,
    (u, q) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
  );
  const del = useDeleteDialog<IUser>(USER_API, (id) =>
    setItems((prev) => prev.filter((u) => u.id !== id))
  );

  return (
    <CrudLayout
      icon="users"
      title={aroma.users.title}
      subtitle={aroma.users.subtitle}
      newLabel={aroma.users.new}
      newHref={`${aroma.navAdmin.userurl}/${aroma.commons.newUrl}`}
      searchPlaceholder={aroma.users.searchPlaceholder}
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
      deleteTarget={del.target ? { entity: aroma.users.entity, name: del.target.name } : null}
      deleting={del.deleting}
      onCancelDelete={() => del.setTarget(null)}
      onConfirmDelete={del.confirm}
    >
      <TableAroma
        etiqueta={aroma.users.title}
        columnas={columns}
        filas={paging.rows}
        renderCelda={(u: IUser, key) => {
          if (key === "id") return <span className="text-gray-500">#{u.id}</span>;
          if (key === "name")
            return (
              <span className="flex items-center gap-3 font-semibold">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-navy text-xs text-white">
                  {u.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                </span>
                {u.name}
              </span>
            );
          if (key === "email") return <span className="text-gray-500">{u.email}</span>;
          if (key === "role") return <Badge tipo={u.role.toLowerCase()}>{roleLabel(u.role)}</Badge>;
          if (key === "status")
            return (
              <Badge tipo={u.status.toLowerCase()} punto>
                {u.status === "ACTIVO" ? aroma.labels.active : aroma.labels.inactive}
              </Badge>
            );
          return (
            <AccionesFila
              editHref={`${aroma.navAdmin.userurl}/${u.id}`}
              onDelete={() => del.setTarget(u)}
            />
          );
        }}
      />
    </CrudLayout>
  );
}
