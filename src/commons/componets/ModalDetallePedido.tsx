import Modal from "@/src/commons/componets/Modal";
import Boton from "@/src/commons/componets/Boton";
import Badge from "@/src/commons/componets/Badge";
import RenderIconAroma from "@/src/commons/componets/RenderIconAroma";
import { pedidos, type IPedido } from "@/src/commons/data/pedidosData";
import { formatoPrecio } from "@/src/commons/data/datosEstaticos";

export default function ModalDetallePedido({ pedido = pedidos[0] }: { pedido?: IPedido }) {
  return (
    <Modal titulo={`Pedido #${pedido.id}`} ancho="max-w-lg" pie={<Boton variante="secundario">Cerrar</Boton>}>
      <div className="mb-3 flex items-center justify-between">
        <Badge tipo={pedido.estado.toLowerCase()}>{pedido.estado}</Badge>
        <span className="flex items-center gap-1 text-xs text-gray-500">
          <RenderIconAroma name="calendar" size={13} /> {pedido.fecha}
        </span>
      </div>
      <div className="mb-3 grid grid-cols-2 gap-3 rounded-lg bg-gray-50 p-3 text-sm">
        <div><p className="text-[10px] text-gray-400">CLIENTE</p><b>{pedido.cliente}</b></div>
        <div>
          <p className="text-[10px] text-gray-400">UBICACIÓN</p>
          <span className="flex items-center gap-1 text-gray-600"><RenderIconAroma name="pin" size={13} />{pedido.ubicacion}</span>
        </div>
      </div>
      <p className="mb-1 text-[10px] font-semibold text-gray-400">PRODUCTOS DEL PEDIDO</p>
      <ul className="divide-y divide-black/5 rounded-lg border border-black/5">
        {pedido.items.map((i) => (
          <li key={i.nombre} className="flex justify-between p-3 text-sm">
            <span>
              <b className="block">{i.nombre}</b>
              <span className="text-xs text-gray-400">{i.cantidad} x {formatoPrecio(i.precio)}</span>
            </span>
            <b>{formatoPrecio(i.cantidad * i.precio)}</b>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex items-center justify-between rounded-lg bg-mint/40 p-3">
        <span className="text-sm">Total del pedido</span>
        <b className="text-lg">{formatoPrecio(pedido.total)}</b>
      </div>
    </Modal>
  );
}
