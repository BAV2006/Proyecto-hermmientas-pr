import Link from "next/link";
import RenderIconAroma from "./RenderIconAroma";
import Boton from "./Boton";

interface Props {
  titulo: string;
  subtitulo: string;
  icono?: string;
  accion?: string;
  accionHref?: string; // si viene, el botón es un enlace a esa ruta
}

// Encabezado de cada módulo: icono + título + botón de acción opcional
export default function EncabezadoSeccion({ titulo, subtitulo, icono, accion, accionHref }: Props) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        {icono && (
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-mint/60 text-teal">
            <RenderIconAroma name={icono} size={18} />
          </span>
        )}
        <div>
          <h1 className="text-xl font-bold leading-tight text-navy">{titulo}</h1>
          <p className="text-sm text-gray-500">{subtitulo}</p>
        </div>
      </div>
      {accion &&
        (accionHref ? (
          <Link
            href={accionHref}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-navy px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-navy/90"
          >
            <RenderIconAroma name="plus" size={16} />
            {accion}
          </Link>
        ) : (
          <Boton icono="plus">{accion}</Boton>
        ))}
    </div>
  );
}
