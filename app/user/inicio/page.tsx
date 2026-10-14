import Link from "next/link";
import TarjetaFacturacion from "@/components/TarjetaFacturacion";
import EncabezadoSeccion from "@/components/EncabezadoSeccion";
import CardAroma from "@/components/CardAroma";
import Boton from "@/components/Boton";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <EncabezadoSeccion titulo="Panel Principal" subtitulo="Resumen de tu actividad en Café Aroma." />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <TarjetaFacturacion icono="bag" valor="42" etiqueta="Pedidos totales" tono="navy" fondoBlanco />
        <TarjetaFacturacion icono="clock" valor="3" etiqueta="Pendientes" tono="lemon" fondoBlanco />
        <TarjetaFacturacion icono="check" valor="36" etiqueta="Entregados" tono="teal" fondoBlanco />
        <TarjetaFacturacion icono="cancel" valor="3" etiqueta="Cancelados" tono="gris" fondoBlanco />
      </div>
      <CardAroma className="rounded-2xl">
        <h2 className="text-base font-bold">¿Listo para pedir?</h2>
        <p className="mb-3 text-sm text-gray-500">Explora nuestro catálogo y realiza tu pedido en minutos.</p>
        <Link href="/user/solicitar" className="w-fit">
          <Boton variante="teal" icono="bag">Solicitar ahora</Boton>
        </Link>
      </CardAroma>
    </div>
  );
}
