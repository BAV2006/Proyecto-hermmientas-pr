import Modal from "./Modal";
import CampoFormulario from "./CampoFormulario";
import Boton from "./Boton";

export default function ModalCategoria() {
  return (
    <Modal
      titulo="Nueva Categoría"
      pie={<><Boton variante="secundario">Cancelar</Boton><Boton>Crear Categoría</Boton></>}
    >
      <div className="grid gap-3">
        <CampoFormulario etiqueta="Nombre" placeholder="Ej: Cafés Calientes" />
        <CampoFormulario etiqueta="Estado" opciones={["Activo", "Inactivo"]} />
      </div>
    </Modal>
  );
}
