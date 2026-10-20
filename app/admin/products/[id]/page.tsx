import { Suspense } from "react";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import EncabezadoSeccion from "@/src/commons/componets/EncabezadoSeccion";
import CardAroma from "@/src/commons/componets/CardAroma";
import ProductForm from "@/src/features/products/componets/ProductForm";
import { aroma } from "@/src/commons/localizations";
import { prisma } from "@/src/commons/utils/prisma";
import { parseId } from "@/src/commons/utils/api-response";
import { toCategory } from "@/src/features/category/mapper";
import { toProduct } from "@/src/features/products/mapper";

type Params = Promise<{ id: string }>;

// Lee el producto y las categorías de la base de datos (parte dinámica de la página)
async function ProductEditor({ params }: { params: Params }) {
  await connection();
  const id = parseId((await params).id);
  if (id === null) notFound();

  const [row, categories] = await Promise.all([
    prisma.producto.findUnique({
      where: { id },
      include: { categoria: { select: { nombre: true } } },
    }),
    prisma.categoria.findMany({ orderBy: { nombre: "asc" } }),
  ]);
  if (!row) notFound();

  return <ProductForm product={toProduct(row)} categories={categories.map(toCategory)} />;
}

export default function Page({ params }: { params: Params }) {
  return (
    <>
      <EncabezadoSeccion icono="package" titulo={aroma.products.edit} subtitulo={aroma.products.subtitle} />
      <CardAroma className="max-w-xl">
        <Suspense fallback={<p className="text-sm text-gray-500">{aroma.messages.loading}...</p>}>
          <ProductEditor params={params} />
        </Suspense>
      </CardAroma>
    </>
  );
}
