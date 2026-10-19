"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type InfoCardProps = {
  className?: string;
  icon: ReactNode;
  title: string;
  body: string;
  actionComponent: ReactNode;
};

export default function InfoCard({
  className,
  icon,
  title,
  body,
  actionComponent,
}: InfoCardProps) {
  const router = useRouter();
  return (
    <div
      className={cn(
        "bg-surface border-border rounded p-6 shadow flex flex-col flex-nowrap max-w-96 gap-5 justify-between h-full w-full ",
        className,
      )}
    >
      <div className="flex flex-col flex-nowrap gap-5">
        <div className="bg-secondary w-min h-min aspect-square rounded-xl p-3 text-white">
          {icon}
        </div>
        <div>
          <h2 className="normal-case">{title}</h2>

          <p>{body}</p>
        </div>
      </div>
      {actionComponent}
    </div>
  );
}
