"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";
import { Settings } from "lucide-react";

import { Button } from "@/components/ui/input/button";

import { fetchPublicProfileAction } from "@/lib/domains/user/fetch-public-profile";

export default function PrivateProfileInfo() {
  const [profileName, setProfileName] = useState("");
  const [profileDescription, setProfileDescription] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const fetchProfile = async () => {
      const result = await fetchPublicProfileAction();

      if ("error" in result) {
        notFound();
      }

      setProfileName(result.data.user_name);
      setProfileDescription(result.data.description);
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
            "transition-all",
            isLoading ? "bg-muted w-48 h-10 animate-pulse rounded" : "h-auto"
          )}
        >
          {!isLoading && profileName}
        </h1>
        <Button asChild size="sm" variant="outline">
          <Link href="/profile/settings">
            <Settings />
            <span>Ajustes</span>
          </Link>
        </Button>
      </span>
      <p
        className={cn(
          "text-sm flex flex-row transition-all ",
          isLoading ? "bg-muted h-4 w-full animate-pulse rounded" : ""
        )}
      >
        {!isLoading && profileDescription}
      </p>
      <p
        className={cn(
          "text-xs transition-all ",
          isLoading ? "bg-muted h-3 w-32 animate-pulse rounded" : ""
        )}
      >
        {!isLoading && `Miembro desde ${createdAt}`}
      </p>
    </div>
  );
}
