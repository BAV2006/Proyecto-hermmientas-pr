import Modal from "./Modal";
import Boton from "./Boton";
import RenderIcon from "./RenderIcon";
import { facturas, type IPedido } from "./pedidosData";
import { formatoPrecio } from "./datosEstaticos";

export default function ModalFactura({ pedido = facturas[0] }: { pedido?: IPedido }) {
  return (
    <Modal
      titulo={`Factura #${pedido.id}`}
      ancho="max-w-xl"
      pie={
        <>
          <Boton variante="secundario">Cerrar</Boton>
          <Boton variante="secundario" icono="mail">Enviar por correo</Boton>
          <Boton icono="printer">Imprimir factura</Boton>
        </>
      }
    >
      <div className="mb-3 flex items-center justify-between border-b border-black/5 pb-3">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-navy text-white"><RenderIcon name="receipt" size={18} /></span>
          <div>
            <p className="font-bold">Café Aroma</p>
            <p className="text-[11px] text-gray-400">NIT: 900.123.456-7 · Pedidos Online</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold">Factura #{pedido.id}</p>
          <p className="text-[11px] text-gray-400">{pedido.fecha}</p>
        </div>
      </div>
      <div className="mb-3 grid grid-cols-2 gap-3 rounded-lg bg-gray-50 p-3 text-sm">
        <div><p className="text-[10px] text-gray-400">CLIENTE</p><b>{pedido.cliente}</b></div>
        <div>
          <p className="text-[10px] text-gray-400">UBICACIÓN DE ENTREGA</p>
          <span className="flex items-center gap-1 text-gray-600"><RenderIcon name="pin" size={13} />{pedido.ubicacion}</span>
        </div>
      </div>
      <p className="mb-1 text-[10px] font-semibold text-gray-400">DETALLE DE PRODUCTOS</p>
      <table className="w-full overflow-hidden rounded-lg border border-black/5 text-sm">
        <thead className="bg-gray-50 text-[10px] text-gray-400">
          <tr><th className="p-2 text-left">PRODUCTO</th><th>CANTIDAD</th><th className="text-right">PRECIO UNIT.</th><th className="p-2 text-right">SUBTOTAL</th></tr>
        </thead>
        <tbody>
          {pedido.items.map((i) => (
            <tr key={i.nombre} className="border-t border-black/5">
              <td className="p-2 font-semibold">{i.nombre}</td>
              <td className="text-center">{i.cantidad}</td>
              <td className="text-right text-gray-500">{formatoPrecio(i.precio)}</td>
              <td className="p-2 text-right font-bold">{formatoPrecio(i.cantidad * i.precio)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-3 flex items-center justify-between rounded-lg bg-navy p-3 text-white">
        <span className="text-sm">Total a pagar</span>
        <b className="text-xl">{formatoPrecio(pedido.total)}</b>
      </div>
    </Modal>
  );
}
