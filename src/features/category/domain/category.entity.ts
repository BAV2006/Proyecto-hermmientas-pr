import type { Status } from '@/src/commons/interfaces';

export type Category = {
  id: number;
  name: string;
  status: Status;
  createdAt: Date;
};

export interface ICreate {
  name: string;
  status: Status;
}

export interface IUpdate {
  id: number;
  name: string;
  status: Status;
}
