import { TriangleAlert } from "lucide-react";

type GeneralEmptyFetchCardProps = {
  showIcon?: boolean;
  message?: string;
};

export default function GeneralEmptyFetchCard({
  message,
  showIcon,
}: GeneralEmptyFetchCardProps) {
  return (
    <div className="flex flex-col flex-nowrap justify-center gap-2 items-center border border-border bg-background rounded p-16">
      {showIcon && <TriangleAlert />}
      <span>{message ? message : "No se han encontrado coincidencias"}</span>
    </div>
  );
}
