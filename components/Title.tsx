import RenderIcon from "./RenderIcon";

interface Props {
  title: string;
  icon?: string;
}

// Título de tarjeta: icono + texto en negrita
export default function Title({ title, icon }: Props) {
  return (
    <h2 className="flex items-center gap-2 text-base font-bold text-navy">
      {icon && <RenderIcon name={icon} size={18} className="text-teal" />}
      {title}
    </h2>
  );
}
