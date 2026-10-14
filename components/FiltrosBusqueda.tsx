import CardAroma from "./CardAroma";
import RenderIcon from "./RenderIcon";

interface Campo {
  etiqueta: string;
  tipo: "select" | "date" | "text" | "search";
  placeholder?: string;
  opciones?: string[];
}

const base = "w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm outline-none";

// Tarjeta de filtros (Estado, Fecha, Cliente, Buscar...) reutilizable
export default function FiltrosBusqueda({ campos }: { campos: Campo[] }) {
  return (
    <CardAroma>
      <p className="mb-2 flex items-center gap-2 text-xs font-semibold text-gray-600">
        <RenderIcon name="filter" size={14} /> Filtros de búsqueda
      </p>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {campos.map((c) => (
          <label key={c.etiqueta} className="flex flex-col gap-1 text-xs font-semibold text-gray-600">
            {c.etiqueta}
            {c.tipo === "select" ? (
              <select className={base}>{c.opciones?.map((o) => <option key={o}>{o}</option>)}</select>
            ) : c.tipo === "date" ? (
              <input type="date" className={base} />
            ) : (
              <input readOnly placeholder={c.placeholder} className={base} />
            )}
          </label>
        ))}
      </div>
    </CardAroma>
  );
}
