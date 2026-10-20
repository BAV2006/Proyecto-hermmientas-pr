import { Suspense } from "react";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import EncabezadoSeccion from "@/src/commons/componets/EncabezadoSeccion";
import CardAroma from "@/src/commons/componets/CardAroma";
import CategoryForm from "@/src/features/category/componets/CategoryForm";
import { aroma } from "@/src/commons/localizations";
import { prisma } from "@/src/commons/utils/prisma";
import { parseId } from "@/src/commons/utils/api-response";
import { toCategory } from "@/src/features/category/mapper";

type Params = Promise<{ id: string }>;

// Lee la categoría de la base de datos (parte dinámica de la página)
async function CategoryEditor({ params }: { params: Params }) {
  await connection();
  const id = parseId((await params).id);
  if (id === null) notFound();

  const row = await prisma.categoria.findUnique({ where: { id } });
  if (!row) notFound();

  return <CategoryForm category={toCategory(row)} />;
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
