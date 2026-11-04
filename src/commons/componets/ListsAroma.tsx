import RenderIconAroma from "./RenderIconAroma";

interface Props {
  desc: string; // texto pequeño (ej: "Ventas realizadas")
  icon: string; // nombre del icono
  bgIcon: string; // clase de fondo del icono
  color: string; // clase de color del icono
  value: string; // valor grande (ej: "42")
}

// Fila de resumen: icono + valor + descripción
export default function ListsAroma({ desc, icon, bgIcon, color, value }: Props) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-black/5 p-3">
      <span className={`grid h-9 w-9 place-items-center rounded-lg ${bgIcon} ${color}`}>
        <RenderIconAroma name={icon} size={17} />
      </span>
      <div className="flex-1">
        <p className="text-lg font-bold leading-tight">{value}</p>
        <p className="text-xs text-gray-400">{desc}</p>
      </div>
      <RenderIconAroma name="chevron" size={14} className="text-gray-300" />
    </div>
  );
}
