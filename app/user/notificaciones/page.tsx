import EncabezadoSeccion from "@/components/EncabezadoSeccion";
import RenderIcon from "@/components/RenderIcon";
import { notificaciones } from "@/components/datosEstaticos";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <EncabezadoSeccion titulo="Notificaciones" subtitulo="Mantente al tanto del estado de tus pedidos y novedades." />
      <div className="flex flex-col gap-3">
        {notificaciones.map((n) => (
          <div
            key={n.titulo}
            className={`flex items-center gap-3 rounded-2xl p-3 ${n.leida ? "bg-white/50" : "bg-white"}`}
          >
            <span className={`grid h-9 w-9 place-items-center rounded-xl ${n.leida ? "bg-teal text-navy" : "bg-mint text-gray-500"}`}>
              <RenderIcon name="bell" size={16} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold">{n.titulo}</p>
              <p className="text-xs text-gray-500">{n.mensaje}</p>
            </div>
            <span className="text-xs text-gray-400">{n.tiempo}</span>
            {n.leida && (
              <span className="grid h-5 w-5 place-items-center rounded-full bg-teal text-navy">
                <RenderIcon name="check" size={12} />
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
