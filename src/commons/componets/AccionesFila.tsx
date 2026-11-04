import Link from "next/link";
import RenderIconAroma from "./RenderIconAroma";
import { aroma } from "@/src/commons/localizations";

interface Props {
  editHref?: string; // enlace a la página de edición
  onDelete?: () => void; // abre la confirmación de borrado
}

// Iconos de editar / eliminar al final de cada fila (sin props son solo visuales)
export default function AccionesFila({ editHref, onDelete }: Props) {
  return (
    <span className="flex justify-end gap-3 text-gray-400">
      {editHref ? (
        <Link href={editHref} aria-label={aroma.labels.edit} className="hover:text-navy">
          <RenderIconAroma name="pencil" size={15} />
        </Link>
      ) : (
        <RenderIconAroma name="pencil" size={15} />
      )}
      {onDelete ? (
        <button type="button" aria-label={aroma.labels.delete} onClick={onDelete} className="hover:text-red-600">
          <RenderIconAroma name="trash" size={15} />
        </button>
      ) : (
        <RenderIconAroma name="trash" size={15} />
      )}
    </span>
  );
}
