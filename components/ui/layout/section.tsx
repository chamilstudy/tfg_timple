import { cn } from "@/lib/utils";

type SectionProps = {
  children: React.ReactNode;
  variant?: "default" | "full" | "small";
  className?: string;
};

export default function Section({
  children,
  variant = "default",
  className,
}: SectionProps) {
  const getVariant = (variant: string) => {
    switch (variant) {
      default:
        return "max-w-2xl px-6  w-full flex flex-col flex-nowrap items-center";
      case "full":
        return "w-full flex flex-col flex-nowrap items-center";
      case "small":
        return "max-w-sm px-6  w-full flex flex-col flex-nowrap items-center";
    }
  };

  return (
    <section className={cn(getVariant(variant), className)}>{children}</section>
  );
}
