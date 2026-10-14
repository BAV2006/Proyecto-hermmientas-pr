import Modal from "./Modal";
import Boton from "./Boton";

interface Props {
  accion: "aceptar" | "rechazar";
  idPedido?: string;
}

// Confirmar aceptar / rechazar un pedido
export default function ModalConfirmarAccion({ accion, idPedido = "1045" }: Props) {
  const acepta = accion === "aceptar";
  return (
    <Modal
      titulo={acepta ? "Aceptar Pedido" : "Rechazar Pedido"}
      pie={
        <>
          <Boton variante="secundario">Cancelar</Boton>
          <Boton variante={acepta ? "primario" : "peligro"}>{acepta ? "Aceptar" : "Rechazar"}</Boton>
        </>
      }
    >
      <p className="text-sm text-gray-500">
        ¿Confirmas que deseas <b className={acepta ? "text-emerald-700" : "text-red-600"}>{accion}</b> el pedido{" "}
        <b className="text-navy">#{idPedido}</b>? El estado cambiará a{" "}
        <b className="text-navy">{acepta ? "Pendiente" : "Cancelado"}</b>.
      </p>
    </Modal>
  );
}
