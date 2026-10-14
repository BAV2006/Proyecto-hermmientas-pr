import type { ReactNode } from "react";
import RenderIcon from "./RenderIcon";

interface Props {
  titulo: string;
  pie: ReactNode;
  ancho?: string;
  children: ReactNode;
}

// Ventana emergente base (maquetación estática): encabezado, cuerpo y pie
export default function Modal({ titulo, pie, ancho = "max-w-md", children }: Props) {
  return (
    <section className={`w-full ${ancho} overflow-hidden rounded-xl border border-black/5 bg-white shadow-xl`}>
      <header className="flex items-center justify-between border-b border-black/5 px-5 py-4">
        <h2 className="text-base font-bold">{titulo}</h2>
        <RenderIcon name="x" size={16} className="text-gray-400" />
      </header>
      <div className="px-5 py-4">{children}</div>
      <footer className="flex justify-end gap-2 border-t border-black/5 bg-gray-50 px-5 py-3">{pie}</footer>
    </section>
  );
}
