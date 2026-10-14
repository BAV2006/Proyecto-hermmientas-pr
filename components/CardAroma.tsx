"use client";

import type { ReactNode } from "react";
import { Card } from "@heroui/react";
import Title from "./Title";

interface Props {
  titulo?: string;
  icono?: string;
  className?: string;
  children: ReactNode;
}

// Tarjeta base blanca (HeroUI Card) con título opcional
export default function CardAroma({ titulo, icono, className = "", children }: Props) {
  return (
    <Card className={`w-full min-w-0 border border-black/5 bg-white p-4 shadow-sm ${className}`}>
      {titulo && (
        <Card.Header className="mb-3 p-0">
          <Title title={titulo} icon={icono} />
        </Card.Header>
      )}
      {children}
    </Card>
  );
}
