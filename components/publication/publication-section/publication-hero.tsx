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
    <div className="flex flex-col flex-nowrap items-start gap-12 w-full">
      <div className="flex flex-col flex-nowrap items-start gap-2 w-full">
        <h1>{publicationInfo?.song_name}</h1>

        <h2 className="font-normal">
          <span>por </span>
          <Link
            className="link"
            href={`/publication-list?search=${publicationInfo?.author}`}
          >
            {publicationInfo?.author}
          </Link>
        </h2>

        <p className="text-xs flex flex-nowrap gap-2">
          <span>{publicationInfo?.album}</span>
          <span>·</span>

          {publicationInfo?.genres.map((genre, index) => (
            <Link
              key={index}
              href={`/publication-list?genre=${publicationInfo?.genres}`}
              className=" link"
            >
              {genre}
              {index != publicationInfo?.genres.length - 1 && <span>,</span>}
            </Link>
          ))}
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
      </div>

      <div className="flex flex-row flex-nowrap w-full items-center justify-end gap-3 print:hidden">
        {action && action}
      </div>
    </div>
  );
}
