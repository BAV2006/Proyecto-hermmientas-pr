import Modal from "./Modal";
import Boton from "./Boton";
import { aroma } from "@/src/commons/localizations";

interface Props {
  entidad?: string;
  nombre?: string;
  procesando?: boolean;
  overlay?: boolean; // true: se muestra encima de la pantalla con fondo oscuro
  onCancel?: () => void;
  onConfirm?: () => void;
}

// Sin props es solo visual (galería); con onCancel/onConfirm funciona de verdad
export default function ModalConfirmarEliminar({
  entidad = "producto", nombre = "Latte Clásico", procesando = false, overlay = false, onCancel, onConfirm,
}: Props) {
  const modal = (
    <Modal
      titulo={`Eliminar ${entidad.charAt(0).toUpperCase()}${entidad.slice(1)}`}
      pie={
        <>
          <Boton variante="secundario" onClick={onCancel}>{aroma.labels.cancel}</Boton>
          <Boton variante="peligro" onClick={onConfirm} disabled={procesando}>
            {procesando ? aroma.messages.processing : aroma.labels.delete}
          </Boton>
        </>
      }
    >
      <p className="text-sm text-gray-500">
        ¿Estás seguro de que deseas eliminar el {entidad} <b className="text-navy">{nombre}</b>? Esta acción no se puede deshacer.
      </p>
    </Modal>
  );

  if (!overlay) return modal;
  return <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">{modal}</div>;
}
