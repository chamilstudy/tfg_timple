import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";

const infoMessageVariants = cva("flex items-center gap-2 text-xs", {
  variants: {
    variant: {
      default: "",
      error: "text-destructive",
      success: "text-green-600",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface InfoMessageProps
  extends
    React.ComponentPropsWithoutRef<"span">,
    VariantProps<typeof infoMessageVariants> {
  message: string;
}

export default function InfoMessage({
  className,
  variant,
  message,
  ...props
}: InfoMessageProps) {
  return (
    <span
      className={cn(infoMessageVariants({ variant }), className)}
      {...props}
    >
      <Info className="h-[1em] w-min" />
      {message}
    </span>
  );
}
