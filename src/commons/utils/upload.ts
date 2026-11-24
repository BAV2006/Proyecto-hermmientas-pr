import { put } from '@vercel/blob';
import { logger } from '@/src/commons/utils/logger';

// Sube la imagen a Vercel Blob y devuelve su enlace público (o null si falla).
// Solo se usa en el servidor; necesita BLOB_READ_WRITE_TOKEN en el .env
export async function uploadImage(path: string, file: File): Promise<string | null> {
  try {
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const blob = await put(`${path}/${Date.now()}-${safeName}`, file, {
      access: 'public',
    });
    return blob.url;
  } catch (error) {
    logger({ error: error as Error, module: 'uploadImage' });
    return null;
  }
}
