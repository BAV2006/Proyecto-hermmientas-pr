import type { ReactNode } from "react";
import RenderIconAroma from "./RenderIconAroma";

const variantes = {
  primario: "bg-navy text-white hover:bg-navy/90",
  secundario: "border border-black/10 bg-white text-gray-700 hover:bg-gray-50",
  peligro: "bg-red-600 text-white hover:bg-red-700",
  peligroSuave: "bg-red-50 text-red-700 hover:bg-red-100",
  exito: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
  suave: "bg-gray-100 text-gray-700 hover:bg-gray-200",
  teal: "bg-teal text-navy hover:bg-teal/90",
  deshabilitado: "cursor-not-allowed bg-gray-200 text-gray-400",
};

const tamanos = {
  xs: "px-2.5 py-1 text-xs rounded-md gap-1",
  md: "px-4 py-2 text-sm rounded-lg gap-2",
};

interface Props {
  children: ReactNode;
  variante?: keyof typeof variantes;
  tamano?: keyof typeof tamanos;
  tipo?: "button" | "submit";
  icono?: string;
  iconoDerecha?: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export default function Boton({
  children, variante = "primario", tamano = "md", tipo = "button", icono, iconoDerecha,
  className = "", disabled = false, onClick,
}: Props) {
  return (
    <button
      type={tipo}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${variantes[variante]} ${tamanos[tamano]} ${className}`}
    >
      {icono && <RenderIconAroma name={icono} size={tamano === "xs" ? 12 : 16} />}
      {children}
      {iconoDerecha && <RenderIconAroma name={iconoDerecha} size={tamano === "xs" ? 12 : 16} />}
    </button>
  );
}
