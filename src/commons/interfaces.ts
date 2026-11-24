export type Status = "ACTIVO" | "INACTIVO";
export type StaffRole = "ADMINISTRADOR" | "ADMINISTRATIVO" | "MENSAJERO";

export interface ICategory {
  id: number;
  name: string;
  status: Status;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  role: StaffRole;
  status: Status;
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  minStock: number;
  featured: boolean;
  image: string;
  status: Status;
  categoryId: number;
  categoryName: string;
}

// Segundo parámetro de las rutas dinámicas (/api/category/:id)
export interface IRequestParams {
  params: Promise<{ id: string }>;
}

// Patrón de respuesta de todas las APIs
// éxito: { success: true, data? }   error: { success: false, message }
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
}
