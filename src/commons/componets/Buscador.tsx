"use client";

import RenderIconAroma from "./RenderIconAroma";

interface Props {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void; // si no se pasa, el buscador es solo visual
}

export default function Buscador({ placeholder = "Buscar...", value, onChange }: Props) {
  return (
    <label className="flex w-full max-w-md items-center gap-2 rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-gray-500">
      <RenderIconAroma name="search" size={16} />
      <input
        readOnly={!onChange}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent outline-none placeholder:text-gray-400"
      />
    </label>
  );
}
