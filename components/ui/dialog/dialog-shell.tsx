import { useEffect } from "react";

type DialogShellProps = {
  show: boolean;
  children: React.ReactNode;
};

export default function DialogShell({ show, children }: DialogShellProps) {
  useEffect(() => {
    if (!show) return;

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  return (
    show && (
      <div
        className={
          "fixed top-0 left-0 w-dvw h-dvh bg-black bg-opacity-50 backdrop-blur flex flex-col items-center justify-center p-6 overflow-hidden touch-none z-50"
        }
      >
        <div className="bg-background rounded-xl max-w-sm w-full p-10 gap-6 flex flex-col flex-nowrap">
          {children}
        </div>
      </div>
    )
  );
}
