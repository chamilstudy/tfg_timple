"use client";

import { ReactNode, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type DropdownShellProps = {
  title: string;
  body: ReactNode;
};

export default function DropdownShell({ title, body }: DropdownShellProps) {
  const [show, setShow] = useState(false);

  return (
    <div
      className="w-full bg-card border border-border rounded divide-y divide-border cursor-pointer custom-focus-ring hover:border-primary  hover:shadow transition-all ease-in-out"
      onClick={() => setShow(!show)}
      role="button"
      aria-label={title}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          setShow(!show);
        }
      }}
    >
      <span className="p-4 py-3 flex justify-between">
        {title} {show ? <ChevronUp /> : <ChevronDown />}
      </span>
      {show && (
        <>
          <div className="p-4 py-3 text-sm">{body}</div>
        </>
      )}
    </div>
  );
}
