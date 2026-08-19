import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

// Definir propiedades de Textarea, incluyendo variantes
interface TextareaProps
  extends
    React.ComponentProps<"textarea">,
    VariantProps<typeof textareaVariants> {
  icon?: React.ReactNode;
  count?: number;
}

// Variantes para Textarea
const textareaVariants = cva(
  "relative inline-flex items-start rounded text-md transition-all ease-in-out focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "border border-border",
        error: "border border-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

// Componente Textarea
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, icon, count, ...props }, ref) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    // Exponer el ref
    React.useImperativeHandle(ref, () => textareaRef.current!);

    const handleContainerClick = () => {
      textareaRef.current?.focus();
    };

    return (
      <div
        onClick={handleContainerClick}
        className={cn(
          "flex flex-col gap-2 rounded p-3 shadow-sm cursor-text border focus-within:ring-1 focus-within:ring-ring text-foreground bg-surface",
          textareaVariants({ variant }),
          className,
        )}
      >
        <div className="flex items-center gap-3 w-full">
          {icon && <span className="text-input">{icon}</span>}
          <textarea
            ref={textareaRef}
            className="bg-transparent w-full resize-none outline-none border-none placeholder-muted"
            {...props}
          />
        </div>
        {count != null && (
          <span className="text-muted text-sm self-end">{count}</span>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

export { Textarea };
