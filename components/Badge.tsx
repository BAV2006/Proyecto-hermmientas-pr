import type { ReactNode } from "react";

const estilos: Record<string, string> = {
  activo: "bg-emerald-100 text-emerald-800",
  inactivo: "bg-gray-100 text-gray-500",
  administrador: "bg-indigo-100 text-navy",
  administrativo: "bg-teal/30 text-navy",
  mensajero: "bg-lemon/60 text-navy",
  solicitado: "bg-lemon/60 text-amber-900",
  pendiente: "bg-blue-100 text-blue-800",
  entregado: "bg-emerald-100 text-emerald-800",
  cancelado: "bg-red-100 text-red-700",
};

interface Props {
  tipo: string;
  punto?: boolean;
  children?: ReactNode;
}

// Etiqueta de estado / rol reutilizable
export default function Badge({ tipo, punto = false, children }: Props) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        estilos[tipo] ?? "bg-gray-100 text-gray-600"
      }`}
    >
      {punto && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children ?? tipo}
    </span>
  );
}
