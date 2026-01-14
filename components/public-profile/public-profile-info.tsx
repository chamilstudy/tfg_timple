"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";

import { fetchPublicProfileAction } from "@/lib/domains/public/fetch-public-profile";

type ProfileInfoProps = {
  user_name: string;
};

export default function PublicProfileInfo({ user_name }: ProfileInfoProps) {
  const [userName, setUserName] = useState("");
  const [description, setDescription] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const fetchProfile = async () => {
      const result = await fetchPublicProfileAction({
        user_name: user_name,
      });

      if ("error" in result) {
        notFound();
      }

      setUserName(result.data.user_name);
      setDescription(result.data.description);
      setCreatedAt(result.data.created_at);

      setIsLoading(false);
    };

    fetchProfile();
  }, []);

  return (
    <div className="flex flex-col flex-nowrap gap-3 max-w-2xl w-full p-6 py-16">
      <span className="flex flex-row flex-nowrap items-center justify-between">
        <h1
          className={cn(
            "transition-all duration-300",
            isLoading ? "bg-muted w-48 h-10 animate-pulse rounded" : "h-auto"
          )}
        >
          {!isLoading && userName}
        </h1>
      </span>
      <p
        className={cn(
          "text-sm flex flex-row transition-all duration-300",
          isLoading ? "bg-muted h-4 w-full animate-pulse rounded" : ""
        )}
      >
        {!isLoading && description}
      </p>
      <p
        className={cn(
          "text-xs transition-all duration-300",
          isLoading ? "bg-muted h-3 w-32 animate-pulse rounded" : ""
        )}
      >
        {!isLoading && `Miembro desde ${createdAt}`}
      </p>
    </div>
  );
}
