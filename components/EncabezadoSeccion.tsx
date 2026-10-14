import RenderIcon from "./RenderIcon";
import Boton from "./Boton";

interface Props {
  titulo: string;
  subtitulo: string;
  icono?: string;
  accion?: string;
}

// Encabezado de cada módulo: icono + título + botón de acción opcional
export default function EncabezadoSeccion({ titulo, subtitulo, icono, accion }: Props) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        {icono && (
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-mint/60 text-teal">
            <RenderIcon name={icono} size={18} />
          </span>
        )}
        <div>
          <h1 className="text-xl font-bold leading-tight text-navy">{titulo}</h1>
          <p className="text-sm text-gray-500">{subtitulo}</p>
        </div>
      </div>
      {accion && <Boton icono="plus">{accion}</Boton>}
    </div>
  );
}
