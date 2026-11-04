import { z } from "zod";
import { aroma } from "@/src/commons/localizations";

const common = {
  name: z.string().trim().min(2, aroma.errors.smallName).max(100, aroma.errors.bigText),
  email: z
    .email(aroma.errors.invalidEmail)
    .refine((v) => v.length <= 120, aroma.errors.bigText),
  role: z.enum(["ADMINISTRADOR", "ADMINISTRATIVO", "MENSAJERO"]),
  status: z.enum(["ACTIVO", "INACTIVO"]),
  confirmPassword: z.string(),
};

const samePassword = (d: { password: string; confirmPassword: string }) =>
  d.password === d.confirmPassword;

const mismatch = { message: aroma.errors.passwordMismatch, path: ["confirmPassword"] };

// Crear: la contraseña es obligatoria
export const userCreateSchema = z
  .object({
    ...common,
    password: z.string().min(8, aroma.errors.smallPassword).max(72, aroma.errors.bigPassword),
  })
  .refine(samePassword, mismatch);

// Editar: la contraseña es opcional (vacía = no cambiarla)
export const userUpdateSchema = z
  .object({
    ...common,
    password: z
      .string()
      .max(72, aroma.errors.bigPassword)
      .refine((v) => v === "" || v.length >= 8, aroma.errors.smallPassword),
  })
  .refine(samePassword, mismatch);
