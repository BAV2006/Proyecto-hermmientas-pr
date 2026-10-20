import EncabezadoSeccion from "@/src/commons/componets/EncabezadoSeccion";
import CardAroma from "@/src/commons/componets/CardAroma";
import UserForm from "@/src/features/users/componets/UserForm";
import { aroma } from "@/src/commons/localizations";

export default function Page() {
  return (
    <>
      <EncabezadoSeccion icono="users" titulo={aroma.users.new} subtitulo={aroma.users.subtitle} />
      <CardAroma className="max-w-xl">
        <UserForm />
      </CardAroma>
    </>
  );
}
