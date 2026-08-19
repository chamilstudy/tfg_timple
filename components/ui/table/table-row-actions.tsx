import { useState, useRef, useEffect } from "react";

type TableRowAction = {
  label: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
};

type TableRowActionGroup = {
  groupLabel?: string; // opcional, si quieres un título de grupo
  actions: TableRowAction[];
};

type TableRowActionsProps = {
  actionGroups: TableRowActionGroup[];
  menuIcon?: React.ReactNode; // por defecto MoreHorizontal
};

export default function TableRowActions({
  actionGroups,
  menuIcon,
}: TableRowActionsProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative text-xs" ref={ref} tabIndex={0}>
      <div onClick={() => setOpen(!open)} className="pressed w-max">
        {menuIcon}
      </div>

      {open && (
        <div className="flex flex-col shadow-sm bg-white rounded absolute right-0 z-10 border p-1 min-w-[180px]">
          {actionGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="flex flex-col gap-1">
              {group.groupLabel && (
                <div className="px-2 py-1 text-xs font-bold text-gray-500">
                  {group.groupLabel}
                </div>
              )}

              {group.actions.map((action, index) => {
                const content = (
                  <div className="flex flex-row items-center gap-2 p-2 hover:bg-pressed rounded w-full cursor-pointer transition-all ease-out">
                    {action.icon}
                    <span>{action.label}</span>
                  </div>
                );

                if (action.href) {
                  return (
                    <a key={index} href={action.href} className="flex flex-1">
                      {content}
                    </a>
                  );
                } else {
                  return (
                    <div key={index} onClick={action.onClick}>
                      {content}
                    </div>
                  );
                }
              })}

              {/* Separador entre grupos */}
              {groupIndex < actionGroups.length - 1 && (
                <hr className="pb-1 border-gray-200" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
