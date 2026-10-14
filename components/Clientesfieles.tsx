import CardAroma from "./CardAroma";
import { clientesFieles } from "./datosEstaticos";

export default function Clientesfieles() {
  return (
    <CardAroma titulo="Clientes fieles" icono="trophy">
      <ul className="flex flex-col gap-3">
        {clientesFieles.map((c, i) => (
          <li key={c.nombre} className="flex items-center gap-3">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-gray-100 text-[10px] font-bold text-gray-500">
              {i + 1}
            </span>
            <span className="grid h-8 w-8 place-items-center rounded-full bg-navy text-xs font-semibold text-white">
              {c.nombre.split(" ").map((p) => p[0]).join("")}
            </span>
            <div className="flex-1">
              <p className="text-sm font-semibold leading-tight">{c.nombre}</p>
              <p className="text-xs text-gray-400">{c.pedidos} pedidos en total</p>
            </div>
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700">
              {c.pedidos}
            </span>
          </li>
        ))}
      </ul>
    </CardAroma>
  );
}
