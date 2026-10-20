import CardAroma from "@/src/commons/componets/CardAroma";
import TarjetaFacturacion from "@/src/commons/componets/TarjetaFacturacion";
import ListsAroma from "@/src/commons/componets/ListsAroma";
import LoyalCustomers from "@/src/commons/componets/LoyalCustomers";
import { resumenVentas } from "@/src/commons/data/datosEstaticos";
import TablaUnica from "./TablaUnica";

const META_ACTUAL = 2;
const META_DIA = 50;

// Tarjeta oscura "Meta del día"
function MetaDelDia() {
  const porcentaje = Math.round((META_ACTUAL / META_DIA) * 100);
  return (
    <div className="col-span-2 flex flex-col justify-between rounded-2xl bg-navy p-4 text-white lg:col-span-1">
      <div className="flex items-center justify-between text-xs">
        <span>Meta del día</span>
        <span className="rounded bg-white/15 px-1.5 py-0.5 font-bold">{porcentaje}%</span>
      </div>
      <p className="text-2xl font-bold">
        {META_ACTUAL} <span className="text-sm font-normal text-white/70">/ {META_DIA}</span>
      </p>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/40">
        <div className="h-full rounded-full bg-lemon" style={{ width: `${porcentaje}%` }} />
      </div>
    </div>
  );
}

// Panel inicial del administrador
export default function Dashboard() {
  return (
    <>
      <CardAroma titulo="Totales del día" icono="trending">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
          <TarjetaFacturacion icono="check" valor="2" etiqueta="Entregados" tono="verde" />
          <TarjetaFacturacion icono="clock" valor="2" etiqueta="Pendientes" tono="azul" />
          <TarjetaFacturacion icono="cancel" valor="1" etiqueta="Cancelados" tono="rojo" />
          <TarjetaFacturacion icono="bag" valor="7" etiqueta="Total" tono="mint" />
          <MetaDelDia />
        </div>
      </CardAroma>

      <TablaUnica />

      <div className="grid gap-5 lg:grid-cols-2">
        <CardAroma>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-bold">Resumen de ventas</h2>
            <div className="flex rounded-lg bg-gray-100 p-0.5 text-xs font-semibold text-gray-500">
              <span className="rounded-md bg-white px-2.5 py-1 text-teal shadow-sm">Día</span>
              <span className="px-2.5 py-1">Semana</span>
              <span className="px-2.5 py-1">Mes</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {resumenVentas.map((r) => (
              <ListsAroma
                key={r.etiqueta}
                desc={r.etiqueta}
                icon={r.icono}
                bgIcon={r.bgIcon}
                color={r.color}
                value={r.valor}
              />
            ))}
          </div>
        </CardAroma>
        <LoyalCustomers />
      </div>
    </>
  );
}
