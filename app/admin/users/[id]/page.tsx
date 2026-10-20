import { Suspense } from "react";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import EncabezadoSeccion from "@/src/commons/componets/EncabezadoSeccion";
import CardAroma from "@/src/commons/componets/CardAroma";
import UserForm from "@/src/features/users/componets/UserForm";
import { aroma } from "@/src/commons/localizations";
import { parseId } from "@/src/commons/utils/api-response";
import { toUser } from "@/src/features/users/mapper";
import { findStaff } from "@/src/features/users/server";

type Params = Promise<{ id: string }>;

// Lee el usuario de la base de datos (parte dinámica de la página)
async function UserEditor({ params }: { params: Params }) {
  await connection();
  const id = parseId((await params).id);
  if (id === null) notFound();

  const row = await findStaff(id);
  if (!row) notFound();

  return <UserForm user={toUser(row)} />;
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
