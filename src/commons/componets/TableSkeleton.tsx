"use client";

import { Skeleton } from "@heroui/react";

// Esqueleto de una tabla mientras llegan los datos (Skeleton de HeroUI)
export default function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div
      aria-busy="true"
      className="w-full overflow-hidden rounded-xl border border-black/5 bg-white p-4 shadow-sm"
    >
      <Skeleton className="mb-4 h-4 w-1/3 rounded-lg" />
      <div className="flex flex-col gap-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <Skeleton className="h-4 w-10 rounded-lg" />
            <Skeleton className="h-4 flex-1 rounded-lg" />
            <Skeleton className="h-4 w-24 rounded-lg" />
            <Skeleton className="h-4 w-16 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}