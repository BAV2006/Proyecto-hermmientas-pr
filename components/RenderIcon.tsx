import {
  Trophy, Home, Users, LayoutGrid, Package, ClipboardList, Receipt, Coffee, Bell, ShoppingBag,
  Clock, CheckCircle2, XCircle, TrendingUp, Wallet, PiggyBank, Search, Plus, Pencil, Trash2,
  Eye, Mail, Lock, User, LogOut, Calendar, Filter, MapPin, Printer, RotateCcw, FileText,
  Check, X, Upload, ChevronRight, GlassWater, Cake, Croissant, LayoutDashboard,
  type LucideIcon,
} from "lucide-react";

// Nombre (string) -> icono minimalista. Así las páginas solo pasan icon="trophy".
const iconos: Record<string, LucideIcon> = {
  trophy: Trophy, home: Home, users: Users, grid: LayoutGrid, package: Package,
  clipboard: ClipboardList, receipt: Receipt, coffee: Coffee, bell: Bell, bag: ShoppingBag,
  clock: Clock, check: CheckCircle2, cancel: XCircle, trending: TrendingUp, wallet: Wallet,
  piggy: PiggyBank, search: Search, plus: Plus, pencil: Pencil, trash: Trash2, eye: Eye,
  mail: Mail, lock: Lock, user: User, logout: LogOut, calendar: Calendar, filter: Filter,
  pin: MapPin, printer: Printer, repeat: RotateCcw, file: FileText, tick: Check, x: X,
  upload: Upload, chevron: ChevronRight, drink: GlassWater, cake: Cake, croissant: Croissant,
  dashboard: LayoutDashboard,
};

interface Props {
  name: string;
  size?: number;
  className?: string;
}

export default function RenderIcon({ name, size = 18, className }: Props) {
  const Icono = iconos[name] ?? Coffee;
  return <Icono size={size} className={className} strokeWidth={1.8} aria-hidden />;
}
