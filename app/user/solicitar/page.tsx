import EncabezadoSeccion from "@/components/EncabezadoSeccion";
import Boton from "@/components/Boton";
import Buscador from "@/components/Buscador";
import Cartadeproducto from "@/components/Cartadeproducto";
import ResumenPedido from "@/components/ResumenPedido";
import RenderIcon from "@/components/RenderIcon";
import { catalogo, filtrosCatalogo } from "@/components/datosEstaticos";

export default function Page() {
  const destacados = catalogo.filter((p) => p.top);
  return (
    <div className="flex flex-col gap-4">
      <EncabezadoSeccion titulo="Solicitar" subtitulo="Elige tus productos y arma tu pedido." />
      <div className="flex gap-2">
        <div className="flex-1"><Buscador placeholder="Buscar productos..." /></div>
        <Boton variante="primario" icono="search">Buscar</Boton>
      </div>
      <div className="flex flex-wrap gap-2">
        {filtrosCatalogo.map((f, i) => (
          <span
            key={f.nombre}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold ${
              i === 0 ? "border-teal bg-teal text-navy" : "border-black/10 bg-white text-gray-600"
            }`}
          >
            <RenderIcon name={f.icono} size={14} /> {f.nombre}
          </span>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_300px]">
        <div className="flex flex-col gap-4">
          <section>
            <h2 className="mb-2 text-sm font-bold">⭐ Destacados</h2>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {destacados.map((p) => <Cartadeproducto key={p.nombre} producto={p} compacta />)}
            </div>
          </section>
          <section>
            <h2 className="mb-2 text-sm font-bold">Catálogo</h2>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {catalogo.map((p) => <Cartadeproducto key={p.nombre} producto={p} />)}
            </div>
          </section>
        </div>
        <ResumenPedido />
      </div>
    </div>
  );
}
