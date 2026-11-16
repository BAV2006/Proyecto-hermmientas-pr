import { Suspense } from "react";
import { connection } from "next/server";
import EncabezadoSeccion from "@/src/commons/componets/EncabezadoSeccion";
import CardAroma from "@/src/commons/componets/CardAroma";
import FormSkeleton from "@/src/commons/componets/FormSkeleton";
import ProductForm from "@/src/features/products/componets/ProductForm";
import { categoryContainer } from "@/src/features/category/category.container";
import { aroma } from "@/src/commons/localizations";

// Lee las categorías a través del contenedor (parte dinámica de la página)
async function NewProductForm() {
  await connection();
  const categories = await categoryContainer.listCategories.execute();

  return (
    <ProductForm
      categories={categories
        .map((c) => ({ id: c.id, name: c.name, status: c.status }))
        .sort((a, b) => a.name.localeCompare(b.name))}
    />
  );
}

export default function Page() {
  return (
    <>
      <EncabezadoSeccion icono="package" titulo={aroma.products.new} subtitulo={aroma.products.subtitle} />
      <CardAroma className="max-w-xl">
        <Suspense fallback={<FormSkeleton />}>
          <NewProductForm />
        </Suspense>
      </CardAroma>
    </>
  );
}
