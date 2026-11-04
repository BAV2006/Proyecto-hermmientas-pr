import type { Status } from '@/src/commons/interfaces';

export type Product = {
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
  createdAt: Date;
};

export interface ICreate {
  name: string;
  description: string;
  price: number;
  stock: number;
  status: Status;
  image: string;
  categoryId: number;
  featured: boolean;
}

export interface IUpdate extends ICreate {
  id: number;
}
