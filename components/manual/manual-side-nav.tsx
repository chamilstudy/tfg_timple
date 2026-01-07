"use client";
import { useState } from "react";

import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/input/button";
import { manualData } from "@/components/manual/manual-data";
import ManualSideNavSection from "@/components/manual/manual-side-nav-section";

type ManualSideNavProps = {
  currentArticle: string;
};

export default function ManualSideNav({ currentArticle }: ManualSideNavProps) {
  const [show, setShow] = useState(true);

  return (
    <aside className="flex flex-col p-3 px-6 gap-6 border-b border-card w-full sm:border-r sm:border-b-0 sm:max-w-xs sm:p-6 sm:py-16">
      <Button
        className="self-end"
        variant="ghost"
        onClick={() => setShow(!show)}
      >
        {show ? <X /> : <Menu />}Índice
      </Button>

      {show &&
        manualData.map((section) => (
          <ManualSideNavSection
            key={section.slug}
            section={section}
            currentArticle={currentArticle}
          />
        ))}
    </aside>
  );
}
