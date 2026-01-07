import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

// Definir propiedades de Input, incluyendo las variantes
interface InputProps
  extends React.ComponentProps<"input">,
    VariantProps<typeof inputVariants> {
  icon?: React.ReactNode;
  count?: number;
}

// Definir variantes para el Input
const inputVariants = cva(
  "relative inline-flex items-center whitespace-nowrap rounded text-md transition-all ease-in-out focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-input text-input-foreground border border-border", // Estilo predeterminado
        error: "bg-input text-foreground border border-destructive", // Estilo de error con borde rojo
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// Componente Input
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, type, icon, count, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    // Exponer el ref del input
    React.useImperativeHandle(ref, () => inputRef.current!);

    const handleContainerClick = () => {
      inputRef.current?.focus();
    };

    return (
      <div
        onClick={handleContainerClick}
        className={cn(
          "group flex items-center rounded border bg-input gap-3 p-4 py-3 text-md shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-text focus-within:ring-1 focus-within:ring-ring",
          inputVariants({ variant }),
          className
        )}
      >
        {icon && <span className="text-muted">{icon}</span>}
        <input
          type={type}
          className="bg-transparent outline-none placeholder-muted w-full"
          ref={inputRef}
          {...props}
        />
        {count != null && <span className="text-muted">{count}</span>}
      </div>
    );
  }
);

// Definir displayName para React DevTools
Input.displayName = "Input";

export { Input };
