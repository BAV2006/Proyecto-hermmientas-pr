"use client";

import dynamic from "next/dynamic";
import FormSkeleton from "@/src/commons/componets/FormSkeleton";

// Carga el formulario bajo demanda y muestra el esqueleto mientras llega su código
const CategoryFormLazy = dynamic(() => import("./CategoryForm"), {
  loading: () => <FormSkeleton />,
});

export default CategoryFormLazy;