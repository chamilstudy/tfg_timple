import { cn } from "@/lib/utils";

type SectionTitleProps = {
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
};

export default function SectionTitle({
  title,
  description,
  action,
  className,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "flex flex-row flex-nowrap items-center w-full gap-3",
        className,
      )}
    >
      <div className="flex flex-col flex-nowrap gap-1 w-full">
        <h2>{title}</h2>
        <p className="subheader w-full">{description}</p>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
