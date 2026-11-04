interface Props {
  error?: string | null;
  success?: string | null;
}

// Mensajes de error / éxito que devuelve el servidor en los formularios
export default function FormMessages({ error, success }: Props) {
  return (
    <>
      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{error}</p>
      )}
      {success && (
        <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">{success}</p>
      )}
    </>
  );
}
