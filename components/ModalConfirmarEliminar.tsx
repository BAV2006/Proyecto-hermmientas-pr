import Modal from "./Modal";
import Boton from "./Boton";

interface Props {
  entidad?: string;
  nombre?: string;
}

export default function ModalConfirmarEliminar({ entidad = "producto", nombre = "Latte Clásico" }: Props) {
  return (
    <Modal
      titulo={`Eliminar ${entidad.charAt(0).toUpperCase()}${entidad.slice(1)}`}
      pie={<><Boton variante="secundario">Cancelar</Boton><Boton variante="peligro">Eliminar</Boton></>}
    >
      <p className="text-sm text-gray-500">
        ¿Estás seguro de que deseas eliminar el {entidad} <b className="text-navy">{nombre}</b>? Esta acción no se puede deshacer.
      </p>
    </Modal>
  );
}
