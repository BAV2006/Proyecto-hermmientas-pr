"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import RenderIconAroma from "./RenderIconAroma";
import { aroma } from "@/src/commons/localizations";

const { navAdmin, commons } = aroma;

// "/admin/" -> "/admin"
const limpiar = (url: string) => url.replace(/\/$/, "") || "/";

const items = [
  { href: limpiar(navAdmin.homeurl), etiqueta: navAdmin.home, icono: "home", exacto: true },
  { href: navAdmin.userurl, etiqueta: navAdmin.users, icono: "users", exacto: false },
  { href: navAdmin.categoryurl, etiqueta: navAdmin.categories, icono: "grid", exacto: false },
  { href: navAdmin.producturl, etiqueta: navAdmin.products, icono: "package", exacto: false },
  { href: navAdmin.orderurl, etiqueta: navAdmin.orders, icono: "clipboard", exacto: false },
  { href: navAdmin.billingurl, etiqueta: navAdmin.billing, icono: "receipt", exacto: false },
];

// Barra de navegación superior del administrador
export default function NavbarAdmin() {
  const ruta = usePathname();
  return (
    <header className="h-16 border-b border-black/5 bg-white">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-4 px-6">
        <Link href={items[0].href} className="flex items-center gap-2 font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-navy text-white">
            <RenderIconAroma name="coffee" size={16} />
          </span>
          {commons.appName}
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {items.map((it) => {
            const activo = it.exacto ? ruta === it.href : ruta.startsWith(it.href);
            return (
              <Link
                key={it.href}
                href={it.href}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium ${
                  activo ? "bg-navy text-white" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <RenderIconAroma name={it.icono} size={15} /> {it.etiqueta}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-navy text-xs font-bold text-white">MG</span>
          <div className="hidden leading-tight sm:block">
            <p className="text-sm font-bold">{commons.defaultUserName}</p>
            <p className="text-xs text-gray-500">{commons.defaultUserRole}</p>
          </div>
          <Link href="/login-admin" className="flex items-center gap-1 text-sm font-medium text-red-500">
            <RenderIconAroma name="logout" size={15} /> {commons.logout}
          </Link>
        </div>
      </div>
    </header>
  );
}
