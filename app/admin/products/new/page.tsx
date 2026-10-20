import { Suspense } from "react";
import { connection } from "next/server";
import EncabezadoSeccion from "@/src/commons/componets/EncabezadoSeccion";
import CardAroma from "@/src/commons/componets/CardAroma";
import ProductForm from "@/src/features/products/componets/ProductForm";
import { aroma } from "@/src/commons/localizations";
import { prisma } from "@/src/commons/utils/prisma";
import { toCategory } from "@/src/features/category/mapper";

// Lee las categorías de la base de datos (parte dinámica de la página)
async function NewProductForm() {
  await connection();
  const rows = await prisma.categoria.findMany({ orderBy: { nombre: "asc" } });
  return <ProductForm categories={rows.map(toCategory)} />;
}

export default function Page() {
  return (
    <>
      <EncabezadoSeccion icono="package" titulo={aroma.products.new} subtitulo={aroma.products.subtitle} />
      <CardAroma className="max-w-xl">
        <Suspense fallback={<p className="text-sm text-gray-500">{aroma.messages.loading}...</p>}>
          <NewProductForm />
        </Suspense>
      </CardAroma>
    </>
  );
}
