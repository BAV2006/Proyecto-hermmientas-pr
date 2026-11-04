import EncabezadoSeccion from "@/src/commons/componets/EncabezadoSeccion";
import CardAroma from "@/src/commons/componets/CardAroma";
import CategoryForm from "@/src/features/category/componets/CategoryForm";
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
        <CategoryForm />
      </CardAroma>
    </>
  );
}
