import { Suspense } from "react";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import EncabezadoSeccion from "@/src/commons/componets/EncabezadoSeccion";
import CardAroma from "@/src/commons/componets/CardAroma";
import FormSkeleton from "@/src/commons/componets/FormSkeleton";
import ProductForm from "@/src/features/products/componets/ProductForm";
import { productContainer } from "@/src/features/products/product.container";
import { categoryContainer } from "@/src/features/category/category.container";
import { aroma } from "@/src/commons/localizations";
import { parseId } from "@/src/commons/utils/api-response";

type Params = Promise<{ id: string }>;

// Lee el producto y las categorías a través de los contenedores
async function ProductEditor({ params }: { params: Params }) {
  await connection();
  const id = parseId((await params).id);
  if (id === null) notFound();

  const [product, categories] = await Promise.all([
    productContainer.getProductById.execute(id),
    categoryContainer.listCategories.execute(),
  ]);
  if (!product) notFound();

  return (
    <ProductForm
      product={{
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        minStock: product.minStock,
        featured: product.featured,
        image: product.image,
        status: product.status,
        categoryId: product.categoryId,
        categoryName: product.categoryName,
      }}
      categories={categories
        .map((c) => ({ id: c.id, name: c.name, status: c.status }))
        .sort((a, b) => a.name.localeCompare(b.name))}
    />
  );
}

export default function Page({ params }: { params: Params }) {
  return (
    <>
      <EncabezadoSeccion icono="package" titulo={aroma.products.edit} subtitulo={aroma.products.subtitle} />
      <CardAroma className="max-w-xl">
        <Suspense fallback={<FormSkeleton />}>
          <ProductEditor params={params} />
        </Suspense>
      </CardAroma>
    </>
  );
}
