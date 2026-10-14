import CardAroma from "./CardAroma";
import RenderIcon from "./RenderIcon";
import { resumenVentas } from "./datosEstaticos";

export default function Resumenventas() {
  return (
    <CardAroma>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-bold">Resumen de ventas</h2>
        <div className="flex rounded-lg bg-gray-100 p-0.5 text-xs font-semibold text-gray-500">
          <span className="rounded-md bg-white px-2.5 py-1 text-teal shadow-sm">Día</span>
          <span className="px-2.5 py-1">Semana</span>
          <span className="px-2.5 py-1">Mes</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {resumenVentas.map((r) => (
          <div key={r.etiqueta} className="flex items-center gap-3 rounded-xl border border-black/5 p-3">
            <span className={`grid h-9 w-9 place-items-center rounded-lg ${r.fondo}`}>
              <RenderIcon name={r.icono} size={17} />
            </span>
            <div className="flex-1">
              <p className="text-lg font-bold leading-tight">{r.valor}</p>
              <p className="text-xs text-gray-400">{r.etiqueta}</p>
            </div>
            <RenderIcon name="chevron" size={14} className="text-gray-300" />
          </div>
        ))}
      </div>
    </CardAroma>
  );
}
