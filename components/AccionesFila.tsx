import RenderIcon from "./RenderIcon";

// Iconos de editar / eliminar al final de cada fila
export default function AccionesFila() {
  return (
    <span className="flex justify-end gap-3 text-gray-400">
      <RenderIcon name="pencil" size={15} />
      <RenderIcon name="trash" size={15} />
    </span>
  );
}
