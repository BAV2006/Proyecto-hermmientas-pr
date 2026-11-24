"use client";

import { useState } from "react";
import Link from "next/link";
import { mutate } from "swr";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Form, Input, Label } from "@heroui/react";
import FormMessages from "@/src/commons/componets/FormMessages";
import { aroma } from "@/src/commons/localizations";
import { apiFetch } from "@/src/commons/utils/api";
import { ROLE_OPTIONS, SELECT_CLASS, STATUS_OPTIONS, USER_API } from "@/src/commons/constants";
import type { IUser } from "@/src/commons/interfaces";
import { userCreateSchema, userUpdateSchema } from "../schema";

type FormValues = z.infer<typeof userCreateSchema>;

interface Props {
  user?: IUser; // si viene, el formulario edita; si no, crea
}

const emptyValues: FormValues = {
  name: "",
  email: "",
  role: "ADMINISTRATIVO",
  status: "ACTIVO",
  password: "",
  confirmPassword: "",
};

export default function UserForm({ user }: Props) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // al editar, la contraseña es opcional
  const resolver = user ? zodResolver(userUpdateSchema) : zodResolver(userCreateSchema);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver,
    defaultValues: user
      ? { ...emptyValues, name: user.name, email: user.email, role: user.role, status: user.status }
      : emptyValues,
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setServerError(null);
      setSuccess(null);

      const method = user ? "PUT" : "POST";
      const url = user ? `${USER_API}/${user.id}` : USER_API;

      const res = await apiFetch<{ success: boolean }>(url, { method, body: data });
      if (!res.success) {
        throw new Error(user ? aroma.errors.updated : aroma.errors.created);
      }

      await mutate(USER_API); // la lista se actualiza sola
      setSuccess(user ? aroma.success.updated : aroma.success.created);
      reset(user ? { ...data, password: "", confirmPassword: "" } : emptyValues);
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : user ? aroma.errors.updated : aroma.errors.created
      );
    }
  };

  return (
    <div className="flex w-full mx-auto">
      <Form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit(onSubmit)}>
        <Label>{aroma.labels.name}</Label>
        <Input placeholder={aroma.users.namePlaceholder} {...register("name")} />
        {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}

        <Label>{aroma.labels.email}</Label>
        <Input type="email" placeholder={aroma.users.emailPlaceholder} {...register("email")} />
        {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}

        <div className="grid w-full grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label>{aroma.labels.role}</Label>
            <select className={SELECT_CLASS} {...register("role")}>
              {ROLE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <Label>{aroma.labels.status}</Label>
            <select className={SELECT_CLASS} {...register("status")}>
              {STATUS_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        <Label>{user ? aroma.labels.passwordNew : aroma.labels.password}</Label>
        <Input type="password" placeholder="••••••••" autoComplete="new-password" {...register("password")} />
        {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}

        <Label>{aroma.labels.confirmPassword}</Label>
        <Input type="password" placeholder="••••••••" autoComplete="new-password" {...register("confirmPassword")} />
        {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>}

        <FormMessages error={serverError} success={success} />

        <div className="flex items-center gap-3">
          {/* El botón desaparece al hacer clic: no se puede enviar dos veces */}
          {isSubmitting ? (
            <p>{aroma.messages.processing}</p>
          ) : (
            <Button type="submit">{user ? aroma.users.updateSubmit : aroma.users.createSubmit}</Button>
          )}
          <Link href={aroma.navAdmin.userurl} className="text-sm font-semibold text-gray-600 hover:underline">
            {aroma.labels.back}
          </Link>
        </div>
      </Form>
    </div>
  );
}
