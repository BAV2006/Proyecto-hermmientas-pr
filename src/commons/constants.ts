// Rutas de las APIs
export const CATEGORY_API = "/api/category";
export const USER_API = "/api/users";
export const PRODUCT_API = "/api/products";

// Paginación de las listas
export const PAGE_SIZE = 5;

// Estados de un registro (coinciden con el enum EstadoRegistro de Prisma)
export const STATUS_OPTIONS = [
  { value: "ACTIVO", label: "Activo" },
  { value: "INACTIVO", label: "Inactivo" },
] as const;

// Roles del personal (coinciden con el enum Rol de Prisma, sin CLIENTE)
export const STAFF_ROLES = ["ADMINISTRADOR", "ADMINISTRATIVO", "MENSAJERO"] as const;

export const ROLE_OPTIONS = [
  { value: "ADMINISTRADOR", label: "Administrador" },
  { value: "ADMINISTRATIVO", label: "Administrativo" },
  { value: "MENSAJERO", label: "Mensajero" },
] as const;

// Estilo de los <select> y <textarea> de los formularios
export const SELECT_CLASS =
  "w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-navy outline-none";
