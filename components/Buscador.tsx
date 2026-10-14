import RenderIcon from "./RenderIcon";

export default function Buscador({ placeholder = "Buscar..." }: { placeholder?: string }) {
  return (
    <label className="flex w-full max-w-md items-center gap-2 rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-gray-500">
      <RenderIcon name="search" size={16} />
      <input
        readOnly
        placeholder={placeholder}
        className="w-full bg-transparent outline-none placeholder:text-gray-400"
      />
    </label>
  );
}
