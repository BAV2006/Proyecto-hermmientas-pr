// Pedidos del día (admin). Los totales se calculan a partir de los productos del pedido.

export interface ItemPedido {
  nombre: string;
  cantidad: number;
  precio: number;
}

export interface IPedido {
  id: string;
  fecha: string;
  cliente: string;
  ubicacion: string;
  estado: "Solicitado" | "Pendiente" | "Entregado" | "Cancelado";
  items: ItemPedido[];
  total: number;
}

const crear = (p: Omit<IPedido, "total">): IPedido => ({
  ...p,
  total: p.items.reduce((s, i) => s + i.cantidad * i.precio, 0),
});

export const pedidos: IPedido[] = [
  crear({ id: "1045", fecha: "2026-08-26 09:15", cliente: "Laura Patiño", ubicacion: "Calle 72 # 11-30, Chapinero", estado: "Solicitado",
    items: [{ nombre: "Latte Clásico", cantidad: 2, precio: 8500 }, { nombre: "Muffin de Arándanos", cantidad: 1, precio: 5500 }] }),
  crear({ id: "1044", fecha: "2026-08-26 08:50", cliente: "Esteban Ríos", ubicacion: "Av. Caracas # 14-45, Centro", estado: "Solicitado",
    items: [{ nombre: "Frappuccino Caramelo", cantidad: 1, precio: 12500 }] }),
  crear({ id: "1043", fecha: "2026-08-26 08:32", cliente: "Valentina Cruz", ubicacion: "Calle 100 # 45-20, Usaquén", estado: "Pendiente",
    items: [{ nombre: "Frappuccino Caramelo", cantidad: 1, precio: 12500 }, { nombre: "Croissant de Mantequilla", cantidad: 1, precio: 4500 },
            { nombre: "Cheesecake de Frutos Rojos", cantidad: 1, precio: 9500 }, { nombre: "Donuts Glaseadas", cantidad: 1, precio: 4000 }] }),
  crear({ id: "1042", fecha: "2026-08-26 08:10", cliente: "Camilo Ortega", ubicacion: "Cra 7 # 115-30, Norte", estado: "Pendiente",
    items: [{ nombre: "Espresso Doble", cantidad: 1, precio: 6000 }, { nombre: "Cappuccino Italiano", cantidad: 1, precio: 9000 },
            { nombre: "Muffin de Arándanos", cantidad: 1, precio: 5500 }] }),
  crear({ id: "1041", fecha: "2026-08-26 07:55", cliente: "Daniela Mora", ubicacion: "Calle 85 # 12-50, Chapinero", estado: "Entregado",
    items: [{ nombre: "Espresso Doble", cantidad: 2, precio: 6000 }, { nombre: "Brownie de Chocolate", cantidad: 1, precio: 6500 }] }),
  crear({ id: "1040", fecha: "2026-08-26 07:30", cliente: "Felipe Castaño", ubicacion: "Cra 11 # 93-77, Chicó", estado: "Entregado",
    items: [{ nombre: "Latte Clásico", cantidad: 1, precio: 8500 }, { nombre: "Brownie de Chocolate", cantidad: 1, precio: 6500 }] }),
  crear({ id: "1039", fecha: "2026-08-26 07:05", cliente: "Isabella Gómez", ubicacion: "Calle 127 # 20-15, Suba", estado: "Cancelado",
    items: [{ nombre: "Cheesecake de Frutos Rojos", cantidad: 1, precio: 9500 }] }),
];

export const facturas = pedidos.filter((p) => p.estado === "Entregado");
export const totalFacturado = facturas.reduce((s, f) => s + f.total, 0);
