import Link from "next/link";
import RenderIconAroma from "./RenderIconAroma";
import { aroma } from "@/src/commons/localizations";

export default function HeaderUsuario() {
  return (
    <header className="border-b border-black/5 bg-mint">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href={aroma.navUser.dashboardurl} className="flex items-center gap-2 text-lg font-bold">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-navy text-white">
            <RenderIconAroma name="coffee" size={18} />
          </span>
          {aroma.commons.appName}
        </Link>
        <div className="flex items-center gap-3">
          <span className="relative grid h-9 w-9 place-items-center rounded-lg bg-white">
            <RenderIconAroma name="bell" size={17} />
            <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-teal text-[10px] font-bold">
              2
            </span>
          </span>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-navy text-xs font-bold text-teal">MA</span>
          <div className="leading-tight">
            <p className="text-sm font-bold">María Anderson</p>
            <p className="text-xs text-gray-500">Cliente</p>
          </div>
        </div>
      </div>
    </header>
  );
}
