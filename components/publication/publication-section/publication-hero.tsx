import Section from "@/components/ui/layout/section";
import TitleSkeleton from "@/components/ui/layout/title-skeleton";
import { cn } from "@/lib/utils";

// Components
import Link from "next/link";

type PublicationHeroProps = {
  userName: string;
  songName: string;
  author: string;
  genres: Array<string>;
  createdAt: string;
  lastEdit: string;
  action?: React.ReactNode;
  isLoading: boolean;
};

export default function PublicationHero({
  userName,
  songName,
  author,
  genres,
  createdAt,
  lastEdit,
  action,
  isLoading,
}: PublicationHeroProps) {
  return isLoading ? (
    <TitleSkeleton />
  ) : (
    <div className="flex flex-col flex-nowrap items-start gap-3 w-full pb-8">
      <div className="flex flex-row flex-nowrap gap-2 w-full justify-between">
        <h1>{songName}</h1>
      </div>
      <p className="uppercase">
        por <span className="text-primary">{author}</span>
      </p>
      <p className="text-xs">
        Publicado por{" "}
        <Link href={`/user/${userName}`}>
          <span className="link">@{userName}</span>{" "}
        </Link>
        <span>{createdAt}</span>{" "}
        <span className={cn(createdAt == lastEdit ? "hidden" : "")}>
          · Editado {lastEdit}
        </span>
      </p>

      <div className="flex flex-row flex-nowrap gap-3 w-min select-none">
        {genres.map((genre) => {
          return (
            <div
              key={genre + 1}
              className="px-4 flex-1 py-2 w-min h-min rounded-full uppercase text-[0.5rem] font-bold text-primary tracking-widest text-nowrap bg-pressed"
            >
              {genre}
            </div>
          );
        })}
      </div>
      <div className="flex flex-row flex-nowrap w-full items-center justify-end gap-3">
        {action && action}
      </div>
    </div>
  );
}
