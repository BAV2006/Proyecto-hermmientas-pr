"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import RenderIcon from "./RenderIcon";

export interface ItemMenu {
  href: string;
  etiqueta: string;
  icono: string;
  insignia?: number;
}

// Menú lateral reutilizable (lo usa SidebarUsuario)
export default function Barralateral({ items }: { items: ItemMenu[] }) {
  const ruta = usePathname();
  return (
    <nav className="flex w-56 shrink-0 flex-col gap-1">
      {items.map((it) => {
        const activo = ruta.startsWith(it.href);
        return (
          <Link
            key={it.href}
            href={it.href}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${
              activo ? "bg-navy text-white" : "text-gray-500 hover:bg-white/50"
            }`}
          >
            <RenderIcon name={it.icono} size={18} />
            <span className="flex-1">{it.etiqueta}</span>
            {it.insignia && (
              <span className="grid h-5 w-5 place-items-center rounded-full bg-teal text-[11px] font-bold text-navy">
                {it.insignia}
              </span>
            )}
          </Link>
        );
      })}
      <hr className="my-2 border-black/10" />
      <Link href="/" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-gray-500">
        <RenderIcon name="logout" size={18} /> Cerrar sesión
      </Link>
    </nav>
  );
}
