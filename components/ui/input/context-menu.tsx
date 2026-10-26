"use client";

// next
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

// icons
import { MoreVertical } from "lucide-react";

// components
import { Button } from "./button";

type ContextMenuAction = {
  label: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
};

type ContextMenuActionGroup = {
  groupLabel?: string;
  actions: ContextMenuAction[];
};

type ContextMenuProps = {
  actionGroups: ContextMenuActionGroup[];
};

export default function ContextMenu({ actionGroups }: ContextMenuProps) {
  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstActionRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    firstActionRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (!menuRef.current) return;

      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }

      const focusableElements = menuRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not(:disabled), [tabindex]:not([tabindex="-1"])',
      );

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      // Mantener el foco dentro del menú con Tab y Shift + Tab.
      if (event.key === "Tab") {
        if (event.shiftKey && activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }

        return;
      }

      // Navegación cíclica con las flechas.
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();

        const currentIndex = Array.from(focusableElements).indexOf(
          activeElement as HTMLElement,
        );

        const nextIndex =
          event.key === "ArrowDown"
            ? (currentIndex + 1) % focusableElements.length
            : (currentIndex - 1 + focusableElements.length) %
              focusableElements.length;

        focusableElements[nextIndex].focus();
      }

      if (event.key === "Home") {
        event.preventDefault();
        firstElement.focus();
      }

      if (event.key === "End") {
        event.preventDefault();
        lastElement.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  function handleAction(onClick?: () => void) {
    onClick?.();
    setOpen(false);
    triggerRef.current?.focus();
  }

  return (
    <div
      ref={ref}
      className="relative h-min w-min p-1 text-xs outline-none"
      onClick={(event) => event.stopPropagation()}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-label="Abrir menú de acciones"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((previous) => !previous)}
        className="pressed rounded p-1 focus-visible:outline focus-visible:outline-2"
      >
        <MoreVertical size={20} strokeWidth={1} fill="black" />
      </button>

      {open && (
        <div
          ref={menuRef}
          role="menu"
          aria-label="Acciones"
          className="absolute right-0 top-8 z-10 flex min-w-[180px] flex-col rounded border bg-white p-1 shadow-sm"
        >
          {actionGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="flex flex-col gap-1">
              {group.groupLabel && (
                <div className="px-2 py-1 text-xs font-bold text-gray-500">
                  {group.groupLabel}
                </div>
              )}

              {group.actions.map((action, index) => {
                const content = (
                  <>
                    {action.icon}
                    <span>{action.label}</span>
                  </>
                );

                if (action.href) {
                  return (
                    <Button
                      key={index}
                      asChild
                      variant="outline_secondary"
                      className="flex w-full flex-row items-center justify-start gap-2 rounded border-none p-2 text-left shadow-none transition-colors hover:bg-pressed"
                    >
                      <Link
                        href={action.href}
                        role="menuitem"
                        onClick={() => setOpen(false)}
                        className="focus-visible:outline focus-visible:outline-2"
                      >
                        {content}
                      </Link>
                    </Button>
                  );
                }

                return (
                  <Button
                    key={index}
                    ref={
                      groupIndex === 0 && index === 0
                        ? firstActionRef
                        : undefined
                    }
                    variant="outline_secondary"
                    type="button"
                    role="menuitem"
                    onClick={() => handleAction(action.onClick)}
                    className="flex w-full flex-row items-center justify-start gap-2 rounded border-none p-2 text-left shadow-none transition-colors hover:bg-pressed focus-visible:outline focus-visible:outline-2"
                  >
                    {content}
                  </Button>
                );
              })}

              {groupIndex < actionGroups.length - 1 && (
                <hr className="my-1 border-gray-200" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
