import RenderIcon from "./RenderIcon";

const fondos = {
  verde: "bg-emerald-50", azul: "bg-blue-50", rojo: "bg-red-50", mint: "bg-mint/40",
  lemon: "bg-lemon/30", navy: "bg-white", teal: "bg-white", gris: "bg-white",
};
const iconos = {
  verde: "bg-white text-emerald-600", azul: "bg-white text-blue-600", rojo: "bg-white text-red-500",
  mint: "bg-white text-teal", lemon: "bg-lemon text-navy", navy: "bg-navy text-white",
  teal: "bg-teal text-navy", gris: "bg-gray-200 text-gray-500",
};

interface Props {
  icono: string;
  valor: string;
  etiqueta: string;
  tono?: keyof typeof fondos;
  horizontal?: boolean;   // icono a la izquierda del número (Pedidos / Facturación)
  fondoBlanco?: boolean;  // tarjeta blanca (panel del cliente)
}

// Tarjeta de resumen: icono + valor + etiqueta
export default function TarjetaFacturacion({
  icono, valor, etiqueta, tono = "mint", horizontal = false, fondoBlanco = false,
}: Props) {
  const fondo = fondoBlanco ? "bg-white shadow-sm" : `${fondos[tono]} ${horizontal ? "border border-black/5 bg-white" : ""}`;
  return (
    <div className={`flex rounded-2xl p-4 ${horizontal ? "items-center gap-3" : "flex-col gap-3"} ${fondo}`}>
      <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${iconos[tono]}`}>
        <RenderIcon name={icono} size={17} />
      </span>
      <div>
        <p className="text-2xl font-bold leading-none text-navy">{valor}</p>
        <p className="mt-1 text-xs text-gray-500">{etiqueta}</p>
      </div>
    </div>
  );
}
