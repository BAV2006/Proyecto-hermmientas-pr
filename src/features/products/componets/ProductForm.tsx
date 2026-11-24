"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { mutate } from "swr";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Form, Input, Label } from "@heroui/react";
import FormMessages from "@/src/commons/componets/FormMessages";
import { aroma } from "@/src/commons/localizations";
import { apiFetch } from "@/src/commons/utils/api";
import { isBlobUrl } from "@/src/commons/utils/image";
import { PRODUCT_API, SELECT_CLASS, STATUS_OPTIONS } from "@/src/commons/constants";
import type { ICategory, IProduct } from "@/src/commons/interfaces";
import { productSchema } from "../schema";

// z.input: los números se escriben como texto en el formulario y zod los convierte
type FormValues = z.input<typeof productSchema>;

interface Props {
  product?: IProduct; // si viene, el formulario edita; si no, crea
  categories: ICategory[]; // opciones del select de categoría
}

export default function ProductForm({ product, categories }: Props) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  const emptyValues: FormValues = {
    name: "",
    description: "",
    price: 0,
    stock: 0,
    status: "ACTIVO",
    featured: false,
    categoryId: categories[0]?.id ?? 0,
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: product
      ? {
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          status: product.status,
          featured: product.featured,
          categoryId: product.categoryId,
        }
      : emptyValues,
  });

  // libera la vista previa anterior cuando cambia o el formulario se cierra
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // Guarda el archivo elegido (la subida a Vercel Blob la hace el servidor al enviar)
  const onFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // permite volver a elegir el mismo archivo
    if (!file) return;

    const check = productSchema.shape.image.safeParse(file);
    if (!check.success) {
      setImageError(check.error.issues[0]?.message ?? aroma.errors.invalidFileType);
      return;
    }
    setImageError(null);
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data: FormValues) => {
    try {
      setServerError(null);
      setSuccess(null);

      const method = product ? "PUT" : "POST";
      const url = product ? `${PRODUCT_API}/${product.id}` : PRODUCT_API;

      // Se envía como FormData (no JSON) para poder incluir el archivo
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description ?? "");
      formData.append("price", String(data.price));
      formData.append("stock", String(data.stock));
      formData.append("status", String(data.status));
      formData.append("featured", String(data.featured));
      formData.append("categoryId", String(data.categoryId));
      if (imageFile instanceof File) formData.append("image", imageFile, imageFile.name);

      const res = await apiFetch<{ success: boolean }>(url, { method, body: formData });
      if (!res.success) {
        throw new Error(product ? aroma.errors.updated : aroma.errors.created);
      }

      await mutate(PRODUCT_API); // la lista se actualiza sola
      setSuccess(product ? aroma.success.updated : aroma.success.created);
      if (!product) {
        reset(emptyValues);
        setImageFile(null);
        setPreview(null);
      }
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : product ? aroma.errors.updated : aroma.errors.created
      );
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

  const currentImage = product?.image ?? "";

  return (
    <div className="flex w-full mx-auto">
      <Form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit(onSubmit)}>
        <Label>{aroma.labels.category}</Label>
        <select className={SELECT_CLASS} {...register("categoryId")}>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
              {c.status === "INACTIVO" ? ` (${aroma.labels.inactive})` : ""}
            </option>
          ))}
        </select>
        {errors.categoryId && <p className="text-sm text-red-600">{String(errors.categoryId.message)}</p>}

        <Label>{aroma.labels.name}</Label>
        <Input placeholder={aroma.products.namePlaceholder} {...register("name")} />
        {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}

        <Label>{aroma.labels.description}</Label>
        <textarea rows={2} className={SELECT_CLASS} {...register("description")} />
        {errors.description && <p className="text-sm text-red-600">{errors.description.message}</p>}

        <div className="grid w-full grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label>{aroma.labels.price}</Label>
            <Input type="number" min={1} step={1} {...register("price")} />
            {errors.price && <p className="text-sm text-red-600">{String(errors.price.message)}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <Label>{aroma.labels.stock}</Label>
            <Input type="number" min={0} step={1} {...register("stock")} />
            {errors.stock && <p className="text-sm text-red-600">{String(errors.stock.message)}</p>}
          </div>
        </div>

        <Label>{aroma.labels.status}</Label>
        <select className={SELECT_CLASS} {...register("status")}>
          {STATUS_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>

        <Label>{aroma.labels.image}</Label>
        <div className="flex w-full items-center gap-3">
          {preview ? (
            // vista previa local del archivo elegido (aún no está subido)
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="" className="h-14 w-14 shrink-0 rounded-lg object-cover" />
          ) : isBlobUrl(currentImage) ? (
            <Image
              src={currentImage}
              alt={product?.name ?? ""}
              width={56}
              height={56}
              className="h-14 w-14 shrink-0 rounded-lg object-cover"
            />
          ) : null}
          <label className="w-fit cursor-pointer text-sm font-semibold text-teal hover:underline">
            {imageFile || isBlobUrl(currentImage) ? aroma.labels.changeImage : aroma.labels.uploadImage}
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              disabled={isSubmitting}
              onChange={onFile}
            />
          </label>
        </div>
        <FormMessages error={imageError} />

        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" {...register("featured")} />
          {aroma.labels.featured}
        </label>

        <FormMessages error={serverError} success={success} />

        <div className="flex items-center gap-3">
          {/* El botón desaparece al hacer clic: no se puede enviar dos veces */}
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
