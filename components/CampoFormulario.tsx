import RenderIcon from "./RenderIcon";

interface Props {
  etiqueta: string;
  placeholder?: string;
  tipo?: "text" | "password" | "email" | "number";
  opciones?: string[];
  multilinea?: boolean;
  valor?: string;
  icono?: string;
}

const base =
  "w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-navy outline-none placeholder:text-gray-400";

// Campo de formulario reutilizable (input, select o textarea)
export default function CampoFormulario({
  etiqueta, placeholder, tipo = "text", opciones, multilinea, valor, icono,
}: Props) {
  return (
    <label className="flex flex-col gap-1 text-xs font-semibold text-gray-600">
      {etiqueta}
      {opciones ? (
        <select defaultValue={valor} className={base}>
          {opciones.map((o) => <option key={o}>{o}</option>)}
        </select>
      ) : multilinea ? (
        <textarea defaultValue={valor} placeholder={placeholder} rows={2} className={base} />
      ) : (
        <span className="relative block">
          {icono && (
            <RenderIcon name={icono} size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          )}
          <input
            type={tipo}
            defaultValue={valor}
            placeholder={placeholder}
            className={`${base} ${icono ? "pl-9" : ""}`}
          />
        </span>
      )}
    </label>
  );
}
