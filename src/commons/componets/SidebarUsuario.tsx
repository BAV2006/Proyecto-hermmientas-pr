import Barralateral from "./Barralateral";
import { aroma } from "@/src/commons/localizations";

const { navUser } = aroma;

const items = [
  { href: navUser.dashboardurl, etiqueta: navUser.dashboard, icono: "dashboard" },
  { href: navUser.requesturl, etiqueta: navUser.request, icono: "bag" },
  { href: navUser.recentOrdersurl, etiqueta: navUser.recentOrders, icono: "clipboard" },
  { href: navUser.notificationsurl, etiqueta: navUser.notifications, icono: "bell", insignia: 2 },
];

export default function SidebarUsuario() {
  return <Barralateral items={items} />;
}
