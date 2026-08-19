import { cn } from "@/lib/utils";

// Components
import { Button } from "../ui/input/button";
import Link from "next/link";
import { Settings } from "lucide-react";
import Section from "../ui/layout/section";
import HeroTitle from "../ui/layout/hero-title";

type PrivateProfileHeroProps = {
  userName: string;
  description: string;
  createdAt: string;
  isLoading: boolean;
};

export default function PrivateProfileHero({
  userName,
  description,
  createdAt,
  isLoading,
}: PrivateProfileHeroProps) {
  return (
    <Section className="flex flex-col flex-nowrap gap-3 py-16">
      <HeroTitle
        title={userName}
        description={description}
        info={`Miembro desde ${createdAt}`}
        action={
          <Button
            asChild
            size="sm"
            variant="outline"
            aria-label="Navegar a ajustes"
          >
            <Link href="/profile/settings">
              <Settings />
              <span>Ajustes</span>
            </Link>
          </Button>
        }
        isLoading={isLoading}
      />
    </Section>
  );
}

/**
 <span className="flex flex-row flex-nowrap items-center justify-between gap-3 w-full">
        <h1
          className={cn(
            "transition-all",
            isLoading ? "bg-muted w-48 h-10 animate-pulse rounded" : "h-auto",
          )}
        >
          {!isLoading && userName}
        </h1>
        <Button
          asChild
          size="sm"
          variant="outline"
          aria-label="Navegar a ajustes"
        >
          <Link href="/profile/settings">
            <Settings />
            <span>Ajustes</span>
          </Link>
        </Button>
      </span>
      <p
        className={cn(
          "subheader flex flex-row transition-all ",
          isLoading ? "bg-muted h-4 w-full animate-pulse rounded" : "",
        )}
      >
        {!isLoading && description}
      </p>
      <p
        className={cn(
          "text-xs transition-all ",
          isLoading ? "bg-muted h-3 w-32 animate-pulse rounded" : "",
        )}
      >
        {!isLoading && `Miembro desde ${createdAt}`}
      </p>
 */
