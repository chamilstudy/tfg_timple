import { ReactNode } from "react";
import { cn } from "@/lib/utils";

import DialogShell from "@/components/ui/dialog/dialog-shell";

type DialogProps = {
  dialogs: ReactNode[];
  show: boolean;
  page: number;
};

export default function Dialog({ dialogs, show, page }: DialogProps) {
  return (
    <DialogShell show={show}>
      {dialogs[page]}
      {dialogs.length > 1 && (
        <div className="flex gap-2 w-full justify-center">
          {dialogs.map((_, index) => (
            <div
              key={index}
              className={cn(
                "h-2 w-2 rounded-full",
                index == page ? "bg-primary" : "bg-muted"
              )}
            ></div>
          ))}
        </div>
      )}
    </DialogShell>
  );
}
