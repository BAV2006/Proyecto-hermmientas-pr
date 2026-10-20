import { z } from "zod";
import { aroma } from "@/src/commons/localizations";

// Imagen: vacía, un enlace http(s) o un emoji corto
const imageOk = (v: string) => v === "" || /^https?:\/\//i.test(v) || v.length <= 8;

export const productSchema = z.object({
  name: z.string().trim().min(2, aroma.errors.smallName).max(100, aroma.errors.bigText),
  description: z.string().trim().max(300, aroma.errors.bigText),
  price: z
    .number({ error: aroma.errors.invalidNumber })
    .int(aroma.errors.invalidNumber)
    .positive(aroma.errors.invalidPrice),
  stock: z
    .number({ error: aroma.errors.invalidNumber })
    .int(aroma.errors.invalidNumber)
    .min(0, aroma.errors.invalidStock),
  status: z.enum(["ACTIVO", "INACTIVO"]),
  image: z.string().trim().max(500, aroma.errors.bigText).refine(imageOk, aroma.errors.invalidImage),
  categoryId: z
    .number({ error: aroma.errors.invalidCategory })
    .int(aroma.errors.invalidCategory)
    .positive(aroma.errors.invalidCategory),
  featured: z.boolean(),
});
