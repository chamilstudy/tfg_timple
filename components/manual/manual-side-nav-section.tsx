"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { Section } from "@/components/manual/manual-data";

type ManualSideNavSectionProps = {
  section: Section;
  currentArticle: string;
};

export default function ManualSideNavSection({
  section,
  currentArticle,
}: ManualSideNavSectionProps) {
  const [show, setShow] = useState(true);

  return (
    <div key={section.slug} className="grid gap-3 h-min ">
      <div
        tabIndex={0}
        className="font-bold flex justify-between gap-3 cursor-pointer custom-focus-ring"
        onClick={() => setShow(!show)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            setShow(!show);
          }
        }}
      >
        {section.title} {show ? <ChevronDown /> : <ChevronUp />}
      </div>

      {show &&
        section.articles.map((article) => (
          <Link
            href={"/manual/" + section.slug + "/" + article.slug}
            key={article.slug}
            className={cn(
              "text-sm w-full pl-3 border-l-4 border-background custom-focus-ring",
              currentArticle == article.slug
                ? "text-primary border-solid border-l-4 border-primary"
                : ""
            )}
          >
            {article.title}
          </Link>
        ))}
    </div>
  );
}
