import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type ButtonGroupProps = {
  buttons: ReactNode[];
  className?: string;
};

export default function ButtonGroup({ buttons, className }: ButtonGroupProps) {
  return (
    <div className={cn("flex flex-row flex-nowrap", className)}>
      {buttons.map((button, index) => (
        <div
          key={index}
          className={cn(
            "[&>button]:rounded-none ",
            index === 0 && "[&>button]:rounded-l",
            index === buttons.length - 1 && "[&>button]:rounded-r",
            index > 0 && "[&>button]:-ml-px ",
          )}
        >
          {button}
        </div>
      ))}
    </div>
  );
}
