// ¿El texto es un enlace http(s)?
export const isUrl = (value: string) => /^https?:\/\//i.test(value);

// ¿El enlace es de Vercel Blob? Solo esos se pueden mostrar con next/image
// (el dominio está permitido en next.config.ts)
export function isBlobUrl(value: string): boolean {
  try {
    return new URL(value).hostname.endsWith('.public.blob.vercel-storage.com');
  } catch {
    return false;
  }
}
