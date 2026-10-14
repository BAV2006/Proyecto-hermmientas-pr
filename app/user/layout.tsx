import HeaderUsuario from "@/components/HeaderUsuario";
import SidebarUsuario from "@/components/SidebarUsuario";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-mint">
      <HeaderUsuario />
      <div className="mx-auto flex max-w-7xl gap-6 p-4">
        <SidebarUsuario />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
