"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Form, Input, Label } from "@heroui/react";
import FormMessages from "@/src/commons/componets/FormMessages";
import { aroma } from "@/src/commons/localizations";
import { apiFetch } from "@/src/commons/utils/api";
import { PRODUCT_API, SELECT_CLASS, STATUS_OPTIONS } from "@/src/commons/constants";
import type { ICategory, IProduct } from "@/src/commons/interfaces";
import { productSchema } from "../schema";

type FormValues = z.infer<typeof productSchema>;

interface Props {
  product?: IProduct; // si viene, el formulario edita; si no, crea
  categories: ICategory[]; // opciones del select de categoría
}

export default function ProductForm({ product, categories }: Props) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const emptyValues: FormValues = {
    name: "",
    description: "",
    price: 0,
    stock: 0,
    status: "ACTIVO",
    image: "",
    categoryId: categories[0]?.id ?? 0,
    featured: false,
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: product
      ? {
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          status: product.status,
          image: product.image,
          categoryId: product.categoryId,
          featured: product.featured,
        }
      : emptyValues,
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      setServerError(null);
      setSuccess(null);

      const method = product ? "PUT" : "POST";
      const url = product ? `${PRODUCT_API}/${product.id}` : PRODUCT_API;

      await apiFetch<IProduct>(url, { method, body: data });

      setSuccess(product ? aroma.success.updated : aroma.success.created);
      if (!product) reset(emptyValues);
      router.refresh();
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : product ? aroma.errors.updated : aroma.errors.created
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (categories.length === 0) {
    return (
      <div className="flex flex-col gap-3">
        <p className="text-sm text-gray-600">{aroma.messages.withoutCategories}</p>
        <Link
          href={`${aroma.navAdmin.categoryurl}/${aroma.commons.newUrl}`}
          className="w-fit text-sm font-semibold text-teal hover:underline"
        >
          {aroma.category.new}
        </Link>
      </div>
    );
  }

  return (
    <div className="flex w-full mx-auto">
      <Form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit(onSubmit)}>
        <Label>{aroma.labels.category}</Label>
        <select className={SELECT_CLASS} {...register("categoryId", { valueAsNumber: true })}>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
              {c.status === "INACTIVO" ? ` (${aroma.labels.inactive})` : ""}
            </option>
          ))}
        </select>
        {errors.categoryId && <p className="text-sm text-red-600">{errors.categoryId.message}</p>}

        <Label>{aroma.labels.name}</Label>
        <Input placeholder={aroma.products.namePlaceholder} {...register("name")} />
        {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}

        <Label>{aroma.labels.description}</Label>
        <textarea rows={2} className={SELECT_CLASS} {...register("description")} />
        {errors.description && <p className="text-sm text-red-600">{errors.description.message}</p>}

        <div className="grid w-full grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label>{aroma.labels.price}</Label>
            <Input type="number" min={1} step={1} {...register("price", { valueAsNumber: true })} />
            {errors.price && <p className="text-sm text-red-600">{errors.price.message}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <Label>{aroma.labels.stock}</Label>
            <Input type="number" min={0} step={1} {...register("stock", { valueAsNumber: true })} />
            {errors.stock && <p className="text-sm text-red-600">{errors.stock.message}</p>}
          </div>
        </div>

        <Label>{aroma.labels.status}</Label>
        <select className={SELECT_CLASS} {...register("status")}>
          {STATUS_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>

        <Label>{aroma.labels.image}</Label>
        <Input placeholder="https://... o ☕" {...register("image")} />
        {errors.image && <p className="text-sm text-red-600">{errors.image.message}</p>}

        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" {...register("featured")} />
          {aroma.labels.featured}
        </label>

        <FormMessages error={serverError} success={success} />

        <div className="flex items-center gap-3">
          {isSubmitting ? (
            <p>{aroma.messages.processing}</p>
          ) : (
            <Button type="submit">{product ? aroma.products.updateSubmit : aroma.products.createSubmit}</Button>
          )}
          <Link href={aroma.navAdmin.producturl} className="text-sm font-semibold text-gray-600 hover:underline">
            {aroma.labels.back}
          </Link>
        </div>
      </Form>
    </div>
  );
}
