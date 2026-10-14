import Boton from "./Boton";
import type { ProductoCatalogo } from "./datosEstaticos";

interface Props {
  producto: ProductoCatalogo;
  compacta?: boolean; // versión de "Destacados": solo botón +
}

// Tarjeta de producto del catálogo del cliente
export default function Cartadeproducto({ producto, compacta = false }: Props) {
  return (
    <article className="overflow-hidden rounded-xl bg-white shadow-sm">
      <div className={`relative grid h-24 place-items-center text-5xl ${producto.fondo}`}>
        {producto.emoji}
        {producto.top && !compacta && (
          <span className="absolute left-2 top-2 rounded bg-lemon px-1.5 py-0.5 text-[10px] font-bold">★ Top</span>
        )}
        {producto.agotado && (
          <span className="absolute right-2 top-2 rounded bg-navy px-1.5 py-0.5 text-[10px] font-bold text-white">
            Agotado
          </span>
        )}
      </div>
      <div className="p-3">
        <h3 className="text-sm font-bold leading-tight">{producto.nombre}</h3>
        {!compacta && <p className="line-clamp-1 text-xs text-gray-400">{producto.descripcion}</p>}
        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm font-bold text-teal">${producto.precio.toFixed(2)}</span>
          <Boton variante={producto.agotado ? "deshabilitado" : "primario"} tamano="xs" icono="plus">
            {compacta ? "" : "Agregar"}
          </Boton>
        </div>
      </div>
    </article>
  );
}
