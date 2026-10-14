interface Props {
  actual: number;
  meta: number;
}

export default function Metadeldia({ actual, meta }: Props) {
  const porcentaje = Math.round((actual / meta) * 100);
  return (
    <div className="col-span-2 flex flex-col justify-between rounded-2xl bg-navy p-4 text-white lg:col-span-1">
      <div className="flex items-center justify-between text-xs">
        <span>Meta del día</span>
        <span className="rounded bg-white/15 px-1.5 py-0.5 font-bold">{porcentaje}%</span>
      </div>
      <p className="text-2xl font-bold">
        {actual} <span className="text-sm font-normal text-white/70">/ {meta}</span>
      </p>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/40">
        <div className="h-full rounded-full bg-lemon" style={{ width: `${porcentaje}%` }} />
      </div>
    </div>
  );
}
