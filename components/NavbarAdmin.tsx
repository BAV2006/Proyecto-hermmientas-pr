"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import RenderIcon from "./RenderIcon";

const items = [
  { href: "/admin/dashboard", etiqueta: "Inicio", icono: "home" },
  { href: "/admin/usuarios", etiqueta: "Usuarios", icono: "users" },
  { href: "/admin/categorias", etiqueta: "Categorías", icono: "grid" },
  { href: "/admin/productos", etiqueta: "Productos", icono: "package" },
  { href: "/admin/pedidos", etiqueta: "Pedidos", icono: "clipboard" },
  { href: "/admin/facturacion", etiqueta: "Facturación", icono: "receipt" },
];

// Barra de navegación superior del administrador
export default function NavbarAdmin() {
  const ruta = usePathname();
  return (
    <header className="h-16 border-b border-black/5 bg-white">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-4 px-6">
        <Link href="/admin/dashboard" className="flex items-center gap-2 font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-navy text-white">
            <RenderIcon name="coffee" size={16} />
          </span>
          Café Aroma
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium ${
                ruta.startsWith(it.href) ? "bg-navy text-white" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <RenderIcon name={it.icono} size={15} /> {it.etiqueta}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-navy text-xs font-bold text-white">MG</span>
          <div className="hidden leading-tight sm:block">
            <p className="text-sm font-bold">María González</p>
            <p className="text-xs text-gray-500">Administrador</p>
          </div>
          <Link href="/login-admin" className="flex items-center gap-1 text-sm font-medium text-red-500">
            <RenderIcon name="logout" size={15} /> Salir
          </Link>
        </div>
      </div>
    </header>
  );
}
