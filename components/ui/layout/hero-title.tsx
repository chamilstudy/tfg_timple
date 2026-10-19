// Components
import TitleSkeleton from "./title-skeleton";

// Next
import { cn } from "@/lib/utils";

type HeroTitleProps = {
  title: string;
  description: string;
  info?: string;
  mainAction?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  isLoading?: boolean;
};

export default function HeroTitle({
  title,
  description,
  info,
  mainAction,
  action,
  className,
  isLoading,
}: HeroTitleProps) {
  return isLoading ? (
    <TitleSkeleton />
  ) : (
    <div
      className={cn(
        "flex flex-col flex-nowrap items-center w-full gap-3",
        className,
      )}
    >
      <div className="flex flex-row flex-nowrap gap-2 w-full justify-between">
        <h1>{title}</h1>
        {mainAction && <div>{mainAction}</div>}
      </div>
      {description && (
        <p className="subheader w-full break-words">{description}</p>
      )}
      {info && <p className="info w-full">{info}</p>}

      {action && (
        <div className="w-full flex flex-col flex-nowrap justify-center items-end gap-3">
          {action}
        </div>
      )}
    </div>
  );
}
