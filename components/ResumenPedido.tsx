import { resumenPedido } from "./datosEstaticos";

export default function ResumenPedido() {
  const cantidad = resumenPedido.reduce((s, i) => s + i.cantidad, 0);
  const total = resumenPedido.reduce((s, i) => s + i.cantidad * i.precio, 0);
  return (
    <aside className="h-fit rounded-2xl bg-white p-4 shadow-sm xl:sticky xl:top-4">
      <h2 className="mb-3 text-base font-bold">Resumen del Pedido</h2>
      <ul className="flex flex-col gap-2">
        {resumenPedido.map((i) => (
          <li key={i.nombre} className="flex items-center gap-3 rounded-xl bg-mint/40 p-2">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-white text-xl">{i.emoji}</span>
            <div className="flex-1">
              <p className="text-sm font-bold leading-tight">{i.nombre}</p>
              <p className="text-xs text-gray-400">${i.precio.toFixed(2)} c/u</p>
            </div>
            <span className="flex items-center gap-2 text-sm font-bold">
              <span className="grid h-6 w-6 place-items-center rounded bg-white">−</span>
              {i.cantidad}
              <span className="grid h-6 w-6 place-items-center rounded bg-navy text-white">+</span>
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex flex-col gap-1 border-t border-black/5 pt-3 text-sm text-gray-500">
        <p className="flex justify-between">Cantidad de productos <b className="text-navy">{cantidad}</b></p>
        <p className="flex justify-between">Total <b className="text-lg text-navy">${total.toFixed(2)}</b></p>
      </div>
      <button type="button" className="mt-3 w-full rounded-xl bg-teal py-2.5 text-sm font-bold text-navy">
        Finalizar Pedido
      </button>
    </aside>
  );
}
