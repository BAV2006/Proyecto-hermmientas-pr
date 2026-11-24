import { z } from "zod";
import { aroma } from "@/src/commons/localizations";

const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2 MB
const IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"];

// Los datos llegan como FormData: los números vienen como texto, por eso se usa coerce
export const productSchema = z.object({
  name: z.string().trim().min(2, aroma.errors.smallName).max(100, aroma.errors.bigText),
  description: z.string().trim().max(300, aroma.errors.bigText).optional(),
  price: z.coerce
    .number({ error: aroma.errors.invalidNumber })
    .int(aroma.errors.invalidNumber)
    .positive(aroma.errors.invalidPrice),
  stock: z.coerce
    .number({ error: aroma.errors.invalidNumber })
    .int(aroma.errors.invalidNumber)
    .min(0, aroma.errors.invalidStock),
  status: z.enum(["ACTIVO", "INACTIVO"]),
  // en el formulario es un booleano; en FormData llega como "true" o "false"
  featured: z.union([z.boolean(), z.enum(["true", "false"]).transform((v) => v === "true")]),
  categoryId: z.coerce
    .number({ error: aroma.errors.invalidCategory })
    .int(aroma.errors.invalidCategory)
    .positive(aroma.errors.invalidCategory),
  // archivo de imagen opcional (PNG, JPG o WEBP, máximo 2 MB)
  image: z
    .instanceof(File)
    .refine((f) => f.size <= MAX_IMAGE_SIZE, aroma.errors.fileTooBig)
    .refine((f) => IMAGE_TYPES.includes(f.type), aroma.errors.invalidFileType)
    .optional(),
});
