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
