import { useEffect, useRef } from "react";
import { createFocusTrap, FocusTrap } from "focus-trap";

type DialogShellProps = {
  show: boolean;
  children: React.ReactNode;
};

export default function DialogShell({ show, children }: DialogShellProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const trapRef = useRef<FocusTrap | null>(null);

  useEffect(() => {
    if (!show) return;

    document.body.style.overflow = "hidden";

    if (dialogRef.current) {
      trapRef.current = createFocusTrap(dialogRef.current, {
        escapeDeactivates: false,
        clickOutsideDeactivates: false,
        returnFocusOnDeactivate: true,
        fallbackFocus: dialogRef.current,
      });

      trapRef.current.activate();
    }

    return () => {
      document.body.style.overflow = "";
      trapRef.current?.deactivate();
    };
  }, [show]);

  return (
    show && (
      <div className="fixed top-0 left-0 w-dvw h-dvh bg-black bg-opacity-50 backdrop-blur flex flex-col items-center justify-center p-6 overflow-hidden touch-none z-50">
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          className="bg-background rounded-xl max-w-sm w-full p-10 gap-6 flex flex-col flex-nowrap"
        >
          {children}
        </div>
      </div>
    )
  );
}
