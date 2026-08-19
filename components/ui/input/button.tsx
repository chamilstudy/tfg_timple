import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "shadow inline-flex items-center justify-center p-3 gap-2 whitespace-nowrap rounded transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-secondary",

        destructive:
          "bg-destructive-foreground text-destructive border border-destructive hover:bg-destructive/60 hover:text-destructive-foreground",

        destructive2:
          "bg-destructive text-primary-foreground hover:bg-destructive/60 hover:text-destructive-foreground",

        outline: "border border-primary text-primary bg-card hover:bg-pressed",

        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary",

        ghost: "hover:bg-pressed hover:text-primary-foreground",

        link: "text-primary underline-offset-4 hover:underline",

        ocult: "hover:bg-pressed shadow-none",
      },
      size: {
        default: "text-md",
        sm: "text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
