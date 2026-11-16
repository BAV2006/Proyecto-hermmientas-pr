"use client";

import { Skeleton } from "@heroui/react";

// Esqueleto de un formulario mientras llegan los datos (Skeleton de HeroUI)
export default function FormSkeleton({ fields = 3 }: { fields?: number }) {
  return (
    <div aria-busy="true" className="flex w-full flex-col gap-4">
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className="flex flex-col gap-2">
          <Skeleton className="h-3 w-24 rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      ))}
      <Skeleton className="h-10 w-40 rounded-lg" />
    </div>
  );
}