import { Suspense } from "react";
import NavbarAdmin from "@/src/commons/componets/NavbarAdmin";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      {/* NavbarAdmin usa usePathname(): con cacheComponents necesita Suspense
          en las rutas con [id], si no el build falla al prerenderizar */}
      <Suspense fallback={<div className="h-16 border-b border-black/5 bg-white" />}>
        <NavbarAdmin />
      </Suspense>
      <main className="min-h-[calc(100vh-64px)] bg-mint/30 p-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-5">{children}</div>
      </main>
    </div>
  );
}
