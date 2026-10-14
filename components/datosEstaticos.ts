// Datos de ejemplo estáticos (según el documento del proyecto). Sin base de datos.

export const formatoPrecio = (valor: number) => `$${valor.toLocaleString("es-CO")}`;

export const usuarios = [
  { id: 1, nombre: "María González", email: "maria.gonzalez@cafearoma.co", rol: "Administrador", estado: "Activo" },
  { id: 2, nombre: "Carlos Restrepo", email: "carlos.restrepo@cafearoma.co", rol: "Administrativo", estado: "Activo" },
  { id: 3, nombre: "Andrea Torres", email: "andrea.torres@cafearoma.co", rol: "Administrativo", estado: "Inactivo" },
  { id: 4, nombre: "Juan Moreno", email: "juan.moreno@cafearoma.co", rol: "Mensajero", estado: "Activo" },
  { id: 5, nombre: "Sofía Vargas", email: "sofia.vargas@cafearoma.co", rol: "Mensajero", estado: "Activo" },
  { id: 6, nombre: "Diego Pineda", email: "diego.pineda@cafearoma.co", rol: "Mensajero", estado: "Inactivo" },
];

export const categorias = [
  { id: 1, nombre: "Cafés Calientes", estado: "Activo" },
  { id: 2, nombre: "Bebidas Frías", estado: "Activo" },
  { id: 3, nombre: "Postres", estado: "Activo" },
  { id: 4, nombre: "Panadería", estado: "Activo" },
  { id: 5, nombre: "Snacks", estado: "Inactivo" },
];

export interface IProducto {
  id: number;
  emoji: string;
  nombre: string;
  categoria: string;
  descripcion: string;
  precio: number;
  stock: number;
  estado: "Activo" | "Inactivo";
}

export const productos: IProducto[] = [
  { id: 1, emoji: "☕", nombre: "Latte Clásico", categoria: "Cafés Calientes", descripcion: "Espresso suave con leche vaporizada y arte en la espuma.", precio: 8500, stock: 40, estado: "Activo" },
  { id: 2, emoji: "☕", nombre: "Cappuccino Italiano", categoria: "Cafés Calientes", descripcion: "Espresso con espuma de leche cremosa.", precio: 9000, stock: 32, estado: "Activo" },
  { id: 3, emoji: "🫘", nombre: "Espresso Doble", categoria: "Cafés Calientes", descripcion: "Doble carga de espresso intenso.", precio: 6000, stock: 60, estado: "Activo" },
  { id: 4, emoji: "🍵", nombre: "Matcha Latte", categoria: "Cafés Calientes", descripcion: "Té verde matcha con leche espumada.", precio: 11000, stock: 18, estado: "Activo" },
  { id: 5, emoji: "🥤", nombre: "Frappuccino Caramelo", categoria: "Bebidas Frías", descripcion: "Café frío batido con caramelo.", precio: 12500, stock: 25, estado: "Activo" },
  { id: 6, emoji: "🧊", nombre: "Cold Brew Vainilla", categoria: "Bebidas Frías", descripcion: "Café infusionado en frío con vainilla.", precio: 10500, stock: 22, estado: "Activo" },
  { id: 7, emoji: "🧁", nombre: "Muffin de Arándanos", categoria: "Postres", descripcion: "Muffin esponjoso con arándanos.", precio: 5500, stock: 15, estado: "Activo" },
  { id: 8, emoji: "🍰", nombre: "Cheesecake de Frutos Rojos", categoria: "Postres", descripcion: "Cheesecake cremoso con salsa de frutos rojos.", precio: 9500, stock: 8, estado: "Activo" },
  { id: 9, emoji: "🍫", nombre: "Brownie de Chocolate", categoria: "Postres", descripcion: "Brownie húmedo con chocolate oscuro.", precio: 6500, stock: 12, estado: "Activo" },
  { id: 10, emoji: "🥐", nombre: "Croissant de Mantequilla", categoria: "Panadería", descripcion: "Croissant hojaldrado recién horneado.", precio: 4500, stock: 30, estado: "Activo" },
  { id: 11, emoji: "🍪", nombre: "Cookies de Chocolate", categoria: "Snacks", descripcion: "Galletas con chips de chocolate.", precio: 3500, stock: 50, estado: "Activo" },
  { id: 12, emoji: "🍩", nombre: "Donuts Glaseadas", categoria: "Snacks", descripcion: "Donas con glaseado dulce.", precio: 4000, stock: 28, estado: "Inactivo" },
];

export const masVendidos = [
  { id: 1, emoji: "☕", nombre: "Latte Clásico", categoria: "Cafés Calientes", vendidos: 28, stock: 40, precio: 8500, stockBajo: false },
  { id: 2, emoji: "🥤", nombre: "Frappuccino Caramelo", categoria: "Bebidas Frías", vendidos: 22, stock: 25, precio: 12500, stockBajo: false },
  { id: 3, emoji: "☕", nombre: "Cappuccino Italiano", categoria: "Cafés Calientes", vendidos: 19, stock: 32, precio: 9000, stockBajo: false },
  { id: 4, emoji: "🧁", nombre: "Muffin de Arándanos", categoria: "Postres", vendidos: 15, stock: 15, precio: 5500, stockBajo: true },
  { id: 5, emoji: "🥐", nombre: "Croissant de Mantequilla", categoria: "Panadería", vendidos: 12, stock: 30, precio: 4500, stockBajo: false },
];

export const clientesFieles = [
  { nombre: "Laura Patiño", pedidos: 48 },
  { nombre: "Esteban Ríos", pedidos: 36 },
  { nombre: "Valentina Cruz", pedidos: 29 },
  { nombre: "Camilo Ortega", pedidos: 22 },
  { nombre: "Daniela Mora", pedidos: 18 },
];

export const resumenVentas = [
  { icono: "bag", valor: "42", etiqueta: "Ventas realizadas", fondo: "bg-mint/60 text-teal" },
  { icono: "wallet", valor: "$1,245,000", etiqueta: "Ganancias totales", fondo: "bg-mint/60 text-teal" },
  { icono: "piggy", valor: "$186,500", etiqueta: "Ahorro acumulado", fondo: "bg-lemon/40 text-orange-500" },
];

// ---------- Vista del cliente (precios en dólares, como en el documento) ----------
export interface ProductoCatalogo {
  nombre: string;
  descripcion: string;
  precio: number;
  emoji: string;
  fondo: string;
  top?: boolean;
  agotado?: boolean;
}

export const catalogo: ProductoCatalogo[] = [
  { nombre: "Latte de Vainilla", descripcion: "Espresso suave con leche...", precio: 3.5, emoji: "☕", fondo: "bg-mint/50", top: true },
  { nombre: "Cappuccino Clásico", descripcion: "Equilibrio perfecto entre...", precio: 3.25, emoji: "☕", fondo: "bg-gray-200", top: true },
  { nombre: "Espresso Doble", descripcion: "Doble dosis de espresso intenso", precio: 2.5, emoji: "🫘", fondo: "bg-orange-200" },
  { nombre: "Frappuccino Mocha", descripcion: "Frappuccino con chocolate...", precio: 4.75, emoji: "🥤", fondo: "bg-amber-100" },
  { nombre: "Matcha Latte", descripcion: "Té verde matcha con leche fria...", precio: 4.25, emoji: "🍵", fondo: "bg-lime/40", top: true },
  { nombre: "Muffin de Chocolate", descripcion: "Muffin esponjoso con chispas d...", precio: 2.75, emoji: "🧁", fondo: "bg-amber-200", top: true },
  { nombre: "Croissant de Almendras", descripcion: "Croissant hojaldrado relleno de...", precio: 2.5, emoji: "🥐", fondo: "bg-orange-100", top: true },
  { nombre: "Croissant con Mermelada", descripcion: "Croissant con mermelada de fre...", precio: 2.25, emoji: "🥐", fondo: "bg-amber-100" },
  { nombre: "Cupcake de Caramelo", descripcion: "Cupcake con buttercream de...", precio: 2.95, emoji: "🧁", fondo: "bg-lime", agotado: true },
];

export const filtrosCatalogo = [
  { nombre: "Todos", icono: "coffee" },
  { nombre: "Café Caliente", icono: "coffee" },
  { nombre: "Bebidas Frías", icono: "drink" },
  { nombre: "Postres", icono: "cake" },
  { nombre: "Panadería", icono: "croissant" },
];

export const resumenPedido = [
  { nombre: "Frappuccino Caramelo", emoji: "🥤", precio: 4.75, cantidad: 2 },
  { nombre: "Espresso Doble", emoji: "☕", precio: 2.5, cantidad: 1 },
  { nombre: "Matcha Latte", emoji: "🍵", precio: 4.25, cantidad: 1 },
  { nombre: "Cappuccino Clásico", emoji: "☕", precio: 3.25, cantidad: 1 },
];

export const pedidosUsuario = [
  { id: "ORD-1042", orden: "ORD-1042", fecha: "2026-08-26", valor: 9.75, estado: "Entregado" },
  { id: "ORD-1041", orden: "ORD-1041", fecha: "2026-08-25", valor: 9.75, estado: "Pendiente" },
  { id: "ORD-1040", orden: "ORD-1040", fecha: "2026-08-24", valor: 5.5, estado: "Solicitado" },
  { id: "ORD-1039", orden: "ORD-1039", fecha: "2026-08-23", valor: 11.5, estado: "Cancelado" },
  { id: "ORD-1038", orden: "ORD-1038", fecha: "2026-08-22", valor: 13.0, estado: "Entregado" },
];

export const notificaciones = [
  { titulo: "Pedido entregado", mensaje: "Tu orden ORD-1042 ha sido entregada.", tiempo: "Hace 10 min", leida: true },
  { titulo: "Pedido en preparación", mensaje: "Tu orden ORD-1041 está siendo preparada.", tiempo: "Hace 1 h", leida: true },
  { titulo: "Promoción disponible", mensaje: "2x1 en Frappuccinos este viernes.", tiempo: "Hace 3 h", leida: false },
  { titulo: "Stock actualizado", mensaje: "Latte de Avellana disponible nuevamente.", tiempo: "Ayer", leida: false },
];
