import Barralateral from "./Barralateral";

const items = [
  { href: "/user/inicio", etiqueta: "Inicio", icono: "dashboard" },
  { href: "/user/solicitar", etiqueta: "Solicitar", icono: "bag" },
  { href: "/user/pedidos", etiqueta: "Últimos pedidos", icono: "clipboard" },
  { href: "/user/notificaciones", etiqueta: "Notificaciones", icono: "bell", insignia: 2 },
];

export default function SidebarUsuario() {
  return <Barralateral items={items} />;
}
