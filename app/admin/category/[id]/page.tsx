import { Suspense } from "react";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import EncabezadoSeccion from "@/src/commons/componets/EncabezadoSeccion";
import CardAroma from "@/src/commons/componets/CardAroma";
import CategoryForm from "@/src/features/category/componets/CategoryForm";
import { categoryContainer } from "@/src/features/category/category.container";
import { aroma } from "@/src/commons/localizations";
import { parseId } from "@/src/commons/utils/api-response";

type Params = Promise<{ id: string }>;

// Lee la categoría a través del contenedor (parte dinámica de la página)
async function CategoryEditor({ params }: { params: Params }) {
  await connection();
  const id = parseId((await params).id);
  if (id === null) notFound();

  const category = await categoryContainer.getCategoryById.execute(id);
  if (!category) notFound();

  return (
    <CategoryForm
      category={{ id: category.id, name: category.name, status: category.status }}
    />
  );
}

export default function Page({ params }: { params: Params }) {
  return (
    <>
      <EncabezadoSeccion icono="grid" titulo={aroma.category.edit} subtitulo={aroma.category.subtitle} />
      <CardAroma className="max-w-xl">
        <Suspense fallback={<p className="text-sm text-gray-500">{aroma.messages.loading}...</p>}>
          <CategoryEditor params={params} />
        </Suspense>
      </CardAroma>
    </>
  );
}
