import { Suspense } from "react";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import EncabezadoSeccion from "@/src/commons/componets/EncabezadoSeccion";
import CardAroma from "@/src/commons/componets/CardAroma";
import UserForm from "@/src/features/users/componets/UserForm";
import { userContainer } from "@/src/features/users/user.container";
import { aroma } from "@/src/commons/localizations";
import { parseId } from "@/src/commons/utils/api-response";

type Params = Promise<{ id: string }>;

// Lee el usuario a través del contenedor (parte dinámica de la página)
async function UserEditor({ params }: { params: Params }) {
  await connection();
  const id = parseId((await params).id);
  if (id === null) notFound();

  const user = await userContainer.getUserById.execute(id);
  if (!user) notFound();

  return (
    <UserForm
      user={{ id: user.id, name: user.name, email: user.email, role: user.role, status: user.status }}
    />
  );
}

export default function Page({ params }: { params: Params }) {
  return (
    <>
      <EncabezadoSeccion icono="users" titulo={aroma.users.edit} subtitulo={aroma.users.subtitle} />
      <CardAroma className="max-w-xl">
        <Suspense fallback={<p className="text-sm text-gray-500">{aroma.messages.loading}...</p>}>
          <UserEditor params={params} />
        </Suspense>
      </CardAroma>
    </>
  );
}
