import TarjetaFacturacion from "@/components/TarjetaFacturacion";
import Metadeldia from "@/components/Metadeldia";
import CardAroma from "@/components/CardAroma";
import Productosmasvendidos from "@/components/Productosmasvendidos";
import Resumenventas from "@/components/Resumenventas";
import Clientesfieles from "@/components/Clientesfieles";

export default function Page() {
  return (
    <>
      <CardAroma titulo="Totales del día" icono="trending">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
          <TarjetaFacturacion icono="check" valor="2" etiqueta="Entregados" tono="verde" />
          <TarjetaFacturacion icono="clock" valor="2" etiqueta="Pendientes" tono="azul" />
          <TarjetaFacturacion icono="cancel" valor="1" etiqueta="Cancelados" tono="rojo" />
          <TarjetaFacturacion icono="bag" valor="7" etiqueta="Total" tono="mint" />
          <Metadeldia actual={2} meta={50} />
        </div>
      </CardAroma>

      <Productosmasvendidos />

      <div className="grid gap-5 lg:grid-cols-2">
        <Resumenventas />
        <Clientesfieles />
      </div>
    </>
  );
}
