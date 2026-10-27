import { z } from 'zod';

export const categorySchema = z.object({
  name: z.string().trim().min(1, 'El nombre es obligatorio').max(60, 'Máximo 60 caracteres'),
  url: z.string().trim().min(1, 'La URL es obligatoria').max(120, 'Máximo 120 caracteres'),
});

export type CategoryFormData = z.infer<typeof categorySchema>;
