import type { ReactNode } from "react";
import ModalUsuario from "@/src/commons/componets/ModalUsuario";
import ModalCategoria from "@/src/commons/componets/ModalCategoria";
import ModalProducto from "@/src/commons/componets/ModalProducto";
import ModalConfirmarEliminar from "@/src/commons/componets/ModalConfirmarEliminar";
import ModalConfirmarAccion from "@/src/commons/componets/ModalConfirmarAccion";
import ModalDetallePedido from "@/src/commons/componets/ModalDetallePedido";
import ModalFactura from "@/src/commons/componets/ModalFactura";

function Grupo({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-sm font-bold text-gray-600">{titulo}</h2>
      <div className="flex flex-wrap items-start gap-6">{children}</div>
    </section>
  );
}

// Galería con todas las ventanas emergentes del proyecto
export default function Ventanasemergentes() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-xl font-bold">Ventanas emergentes</h1>
      <Grupo titulo="Usuarios"><ModalUsuario /></Grupo>
      <Grupo titulo="Categorías"><ModalCategoria /></Grupo>
      <Grupo titulo="Productos"><ModalProducto /><ModalConfirmarEliminar /></Grupo>
      <Grupo titulo="Pedidos">
        <ModalConfirmarAccion accion="aceptar" />
        <ModalConfirmarAccion accion="rechazar" />
        <ModalDetallePedido />
      </Grupo>
      <Grupo titulo="Facturación"><ModalFactura /></Grupo>
    </div>
  );
}
