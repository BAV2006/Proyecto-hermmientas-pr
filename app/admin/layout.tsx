import NavbarAdmin from "@/components/NavbarAdmin";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <NavbarAdmin />
      <main className="min-h-[calc(100vh-64px)] bg-mint/30 p-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-5">{children}</div>
      </main>
    </div>
  );
}