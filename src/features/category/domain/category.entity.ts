export type Category = {
  id: number;
  name: string;
  url: string;
  createdAt: Date;
};

export interface ICreate {
  name: string;
  url: string;
}

export interface IUpdate {
  id: number;
  name: string;
  url: string;
}
