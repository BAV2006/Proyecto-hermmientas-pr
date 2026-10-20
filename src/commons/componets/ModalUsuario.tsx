import Modal from "@/src/commons/componets/Modal";
import CampoFormulario from "@/src/commons/componets/CampoFormulario";
import Boton from "@/src/commons/componets/Boton";

export default function ModalUsuario() {
  return (
    <Modal
      titulo="Nuevo Usuario"
      pie={<><Boton variante="secundario">Cancelar</Boton><Boton>Crear Usuario</Boton></>}
    >
      <div className="grid gap-3">
        <CampoFormulario etiqueta="Nombre completo" placeholder="Ej: Juan Pérez" />
        <CampoFormulario etiqueta="Correo electrónico" tipo="email" placeholder="usuario@cafearoma.co" />
        <div className="grid grid-cols-2 gap-3">
          <CampoFormulario etiqueta="Rol" opciones={["Administrativo", "Administrador", "Mensajero"]} />
          <CampoFormulario etiqueta="Estado" opciones={["Activo", "Inactivo"]} />
          <CampoFormulario etiqueta="Contraseña" tipo="password" placeholder="••••••••" />
          <CampoFormulario etiqueta="Confirmar contraseña" tipo="password" placeholder="••••••••" />
        </div>
      </div>
    </Modal>
  );
}
