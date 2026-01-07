"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils"; // <-- importa tu función cn

type ProfileInfoProps = {
  profile: {
    user_name: string;
    description: string;
    created_at: string;
  };
};

export default function PublicProfileInfo({ profile }: ProfileInfoProps) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex flex-col flex-nowrap gap-3 max-w-2xl w-full p-6 py-16">
      <span className="flex flex-row flex-nowrap items-center justify-between">
        <h1
          className={cn(
            "transition-all duration-300",
            isLoading ? "bg-muted w-48 h-10 animate-pulse rounded" : "h-auto"
          )}
        >
          {!isLoading && profile.user_name}
        </h1>
      </span>
      <p
        className={cn(
          "text-sm flex flex-row transition-all duration-300",
          isLoading ? "bg-muted h-4 w-full animate-pulse rounded" : ""
        )}
      >
        {!isLoading && profile.description}
      </p>
      <p
        className={cn(
          "text-xs transition-all duration-300",
          isLoading ? "bg-muted h-3 w-32 animate-pulse rounded" : ""
        )}
      >
        {!isLoading &&
          `Miembro desde ${new Date(profile.created_at).toLocaleDateString(
            "es-ES",
            {
              day: "numeric",
              month: "long",
              year: "numeric",
            }
          )}`}
      </p>
    </div>
  );
}
