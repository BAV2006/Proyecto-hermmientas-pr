import Modal from "./Modal";
import CampoFormulario from "./CampoFormulario";
import Boton from "./Boton";
import RenderIcon from "./RenderIcon";
import { productos, categorias } from "./datosEstaticos";

// Editar producto (ejemplo con "Latte Clásico")
export default function ModalProducto() {
  const p = productos[0];
  return (
    <Modal
      titulo="Editar Producto"
      ancho="max-w-xl"
      pie={<><Boton variante="secundario">Cancelar</Boton><Boton>Guardar Cambios</Boton></>}
    >
      <div className="grid gap-3">
        <div className="grid grid-cols-2 gap-3">
          <CampoFormulario etiqueta="Categoría" opciones={categorias.map((c) => c.nombre)} valor={p.categoria} />
          <CampoFormulario etiqueta="Nombre" valor={p.nombre} />
        </div>
        <CampoFormulario etiqueta="Descripción" multilinea valor={p.descripcion} />
        <div className="grid grid-cols-2 gap-3">
          <CampoFormulario etiqueta="Precio (COP)" valor={String(p.precio)} />
          <CampoFormulario etiqueta="Stock" valor={String(p.stock)} />
          <CampoFormulario etiqueta="Estado" opciones={["Activo", "Inactivo"]} />
        </div>
        <div className="flex flex-col gap-1 text-xs font-semibold text-gray-600">
          Imagen del producto
          <div className="flex gap-2">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-lg bg-mint/60 text-3xl">{p.emoji}</span>
            <span className="flex flex-1 flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-gray-300 text-gray-400">
              <RenderIcon name="upload" size={18} />
              <span className="text-xs font-normal">Haz clic para subir una imagen</span>
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
