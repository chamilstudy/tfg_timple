import Section from "@/components/ui/layout/section";
import TitleSkeleton from "@/components/ui/layout/title-skeleton";
import PublicationDTO from "@/lib/dto/publication/publication.dto";
import { cn } from "@/lib/utils";

// Components
import Link from "next/link";

type PublicationHeroProps = {
  action?: React.ReactNode;
  publicationInfo?: PublicationDTO;
  isLoading: boolean;
};

export default function PublicationHero({
  action,
  publicationInfo,
  isLoading,
}: PublicationHeroProps) {
  return isLoading ? (
    <TitleSkeleton />
  ) : (
    <div className="flex flex-col flex-nowrap items-start gap-3 w-full ">
      <div className="flex flex-row flex-nowrap gap-2 w-full justify-between">
        <h1>{publicationInfo?.song_name}</h1>
      </div>
      <p className="uppercase">
        por <span className="text-primary">{publicationInfo?.author}</span>
      </p>
      <p className="text-xs">
        Publicado por{" "}
        <Link href={`/profile?user_name=${publicationInfo?.user_name}`}>
          <span className="link">@{publicationInfo?.user_name}</span>{" "}
        </Link>
        <span>{publicationInfo?.created_at}</span>{" "}
        <span className={cn(!publicationInfo?.last_edit_raw ? "hidden" : "")}>
          · Editado {publicationInfo?.last_edit}
        </span>
      </p>

      <div className="flex flex-row flex-nowrap gap-3 w-min select-none">
        {publicationInfo?.genres.map((genre) => {
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
