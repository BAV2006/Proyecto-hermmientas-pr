import EncabezadoSeccion from "@/src/commons/componets/EncabezadoSeccion";
import CardAroma from "@/src/commons/componets/CardAroma";
import CategoryFormLazy from "@/src/features/category/componets/CategoryFormLazy";
import { aroma } from "@/src/commons/localizations";

export default function Page() {
  return (
    <>
      <EncabezadoSeccion
        icono="grid"
        titulo={aroma.category.new}
        subtitulo={aroma.category.subtitle}
      />
      <CardAroma className="max-w-xl">
        <CategoryFormLazy />
      </CardAroma>
    </>
  );
}