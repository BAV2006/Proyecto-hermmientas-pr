# Feature `category` — proyecto Café Aroma

Misma estructura por capas que muestra el profesor (dominio → aplicación → infraestructura → presentación).

## 1. Copiar archivos
Descomprime este zip en la RAÍZ del proyecto (donde están `app/`, `src/`, `prisma/`).
- `app/api/categoria/...`  → rutas de la API
- `src/features/category/...` → toda la feature

La carpeta `commons_opcional/` NO se copia entera: úsala solo para los archivos que no tengas
(`interfaces.ts`, `localizations.ts`, `utils/logger.ts`). Si ya los tienes, solo agrega lo que falte:
- `IRequestParams` en `src/commons/interfaces.ts`
- dentro del objeto `aroma`: `errors.serverError`, `errors.unprocessableContent`, `errors.notFound` y el bloque `category`

## 2. Modelo de Prisma (agregar a `prisma/schema.prisma`)
```prisma
model Category {
  id        Int      @id @default(autoincrement())
  name      String
  url       String
  createdAt DateTime @default(now())
}
```
Luego:
```
pnpm prisma migrate dev --name crear-categoria
pnpm prisma generate
```

## 3. Dependencias (si faltan)
```
pnpm add react-hook-form zod @hookform/resolvers
```

## 4. Cliente de Prisma
`prisma-category.repository.ts` importa `prisma` desde `@/lib/prisma`.
Si tu archivo exporta el cliente con otro nombre o ruta, solo cambia esa línea.

## 5. Usar la lista en la página
`app/admin/categorias/page.tsx`:
```tsx
import CategoryList from '@/src/features/category/components/CategoryList';

export default function CategoriasPage() {
  return <CategoryList />;
}
```

## Endpoints
| Método | Ruta | Acción |
|---|---|---|
| GET | /api/categoria | Listar |
| POST | /api/categoria | Crear |
| GET | /api/categoria/:id | Obtener por id |
| PUT | /api/categoria/:id | Actualizar |
| DELETE | /api/categoria/:id | Eliminar |
