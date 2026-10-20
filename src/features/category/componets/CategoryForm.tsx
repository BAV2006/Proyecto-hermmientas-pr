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
import { CATEGORY_API, SELECT_CLASS, STATUS_OPTIONS } from "@/src/commons/constants";
import type { ICategory } from "@/src/commons/interfaces";
import { categorySchema } from "../schema";

type FormValues = z.infer<typeof categorySchema>;

interface Props {
  category?: ICategory; // si viene, el formulario edita; si no, crea
}

export default function CategoryForm({ category }: Props) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name ?? "",
      status: category?.status ?? "ACTIVO",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      setServerError(null);
      setSuccess(null);

      const method = category ? "PUT" : "POST";
      const url = category ? `${CATEGORY_API}/${category.id}` : CATEGORY_API;

      await apiFetch<ICategory>(url, { method, body: data });

      setSuccess(category ? aroma.success.updated : aroma.success.created);
      if (!category) reset({ name: "", status: "ACTIVO" });
      router.refresh();
    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : category
            ? aroma.errors.updated
            : aroma.errors.created
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex w-full mx-auto">
      <Form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit(onSubmit)}>
        <Label>{aroma.labels.name}</Label>
        <Input placeholder={aroma.category.namePlaceholder} {...register("name")} />
        {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}

        <Label>{aroma.labels.status}</Label>
        <select className={SELECT_CLASS} {...register("status")}>
          {STATUS_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>

        <FormMessages error={serverError} success={success} />

        <div className="flex items-center gap-3">
          {isSubmitting ? (
            <p>{aroma.messages.processing}</p>
          ) : (
            <Button type="submit">
              {category ? aroma.category.updateSubmit : aroma.category.createSubmit}
            </Button>
          )}
          <Link href={aroma.navAdmin.categoryurl} className="text-sm font-semibold text-gray-600 hover:underline">
            {aroma.labels.back}
          </Link>
        </div>
      </Form>
    </div>
  );
}
