import { ReactNode } from "react";
import { cn } from "@/lib/utils";

import { InfoMessage } from "../input/info-message";
import { title } from "process";

type Option = {
  icon?: ReactNode;
  title?: string;
  info?: string;
  content: string;
  action: () => void;
};

type SettingsMenuProps = {
  isLoading?: boolean;
  fixedSize?: boolean;
  options: Option[];
};

export default function SettingsMenu({
  isLoading,
  fixedSize,
  options,
}: SettingsMenuProps) {
  return (
    <div
      className={cn(
        "grid grid-flow-row rounded divide-y border overflow-hidden w-full shadow min-h-32 transition-all ease-in-out",
        isLoading
          ? " bg-muted border-background divide-background shadow-none text-transparent animate-pulse"
          : "bg-card border-border divide-border",
        fixedSize && "auto-rows-fr"
      )}
    >
      {options.map((option, index) => (
        <div
          key={index}
          role="button"
          aria-label={option.title}
          tabIndex={0}
          className={cn(
            "flex items-center justify-between py-3 px-6 ",
            isLoading
              ? "cursor-progress"
              : "hover:bg-secondary hover:text-secondary-foreground cursor-pointer"
          )}
          onClick={option.action}
        >
          <div className="flex gap-5 items-center w-full">
            {option.icon}
            <div className="grid w-full">
              <p className="text-xs font-bold">{option.title}</p>
              <p>{option.content}</p>
              {option.info && (
                <InfoMessage message={option.info} variant="default" />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
