import { cn } from "@/lib/utils";
import Section from "./section";
import TitleSkeleton from "./title-skeleton";

type HeroTitleProps = {
  title: string;
  description: string;
  info?: string;
  action?: React.ReactNode;
  className?: string;
  isLoading?: boolean;
};

export default function HeroTitle({
  title,
  description,
  info,
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
        {action && <div>{action}</div>}
      </div>
      <p className="subheader w-full break-words">{description}</p>
      <p className="info w-full">{info}</p>
    </div>
  );
}
