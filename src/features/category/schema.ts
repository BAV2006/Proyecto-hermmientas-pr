import { z } from "zod";
import { aroma } from "@/src/commons/localizations";

export const categorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, aroma.errors.smallName)
    .max(60, aroma.errors.bigName),
  status: z.enum(["ACTIVO", "INACTIVO"]),
});
