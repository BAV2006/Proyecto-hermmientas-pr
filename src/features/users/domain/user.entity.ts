import type { StaffRole, Status } from '@/src/commons/interfaces';

export type User = {
  id: number;
  name: string;
  email: string;
  role: StaffRole;
  status: Status;
  createdAt: Date;
};

export interface ICreate {
  name: string;
  email: string;
  role: StaffRole;
  status: Status;
  password: string;
}

export interface IUpdate {
  id: number;
  name: string;
  email: string;
  role: StaffRole;
  status: Status;
  password: string; // vacía = no cambiar la contraseña
}
