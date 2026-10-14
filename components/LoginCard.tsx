import Link from "next/link";
import RenderIcon from "./RenderIcon";
import CampoFormulario from "./CampoFormulario";
import Boton from "./Boton";

interface Props {
  variante: "admin" | "cliente";
}

// Inicio de sesión: la variante admin usa correo; la de cliente usa usuario
export default function LoginCard({ variante }: Props) {
  const esAdmin = variante === "admin";
  return (
    <main className={`grid min-h-screen place-items-center p-6 ${esAdmin ? "bg-mint/40" : "bg-mint"}`}>
      <div className="w-full max-w-sm">
        <div className="mb-5 flex flex-col items-center gap-1">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-navy text-white">
            <RenderIcon name="coffee" size={22} />
          </span>
          <h1 className="text-xl font-bold">Café Aroma</h1>
          <p className="text-xs text-gray-500">
            {esAdmin ? "Sistema de Pedidos Online" : "Inicia sesión para realizar y seguir tus pedidos"}
          </p>
        </div>

        <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-lg font-bold">{esAdmin ? "Iniciar Sesión" : "Bienvenido"}</h2>
            <p className="text-xs text-gray-500">
              {esAdmin ? "Ingresa tus credenciales para continuar" : "Ingresa tus datos para continuar"}
            </p>
          </div>
          {esAdmin ? (
            <CampoFormulario etiqueta="Correo electrónico" icono="mail" valor="admin" />
          ) : (
            <CampoFormulario etiqueta="Usuario" icono="user" placeholder="tu_usuario" />
          )}
          <CampoFormulario etiqueta="Contraseña" icono="lock" tipo="password" placeholder="••••••••" />
          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-gray-500">
              <input type="checkbox" /> Recordarme
            </label>
            <span className="font-semibold text-teal">¿Olvidaste tu contraseña?</span>
          </div>
          <Link href={esAdmin ? "/admin/dashboard" : "/user/inicio"} className="w-full">
            <Boton className="w-full" icono={esAdmin ? undefined : "coffee"}>
              {esAdmin ? "Ingresar" : "Iniciar Sesión"}
            </Boton>
          </Link>
          {!esAdmin && (
            <p className="text-center text-xs text-gray-500">
              ¿No tienes cuenta? <span className="font-bold text-teal">Regístrate</span>
            </p>
          )}
        </div>
        {esAdmin && (
          <p className="mt-4 text-center text-[11px] text-gray-400">
            © 2026 Café Aroma · Todos los derechos reservados
          </p>
        )}
      </div>
    </main>
  );
}