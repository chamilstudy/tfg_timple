"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { Section } from "@/lib/actions/utils/manual-data.util";

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
    <div key={section.slug} className="grid gap-3 h-min">
      <div
        tabIndex={0}
        className="font-bold flex justify-between gap-3 cursor-pointer custom-focus-ring hover:text-primary"
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
        section.articles.map((article) =>
          currentArticle == article.slug ? (
            <div
              key={article.slug}
              className="text-sm w-full text-primary flex flex-row items-center gap-2 font-bold"
            >
              <div className="w-1 bg-primary h-[1em] rounded-full"></div>
              <p>{article.title}</p>
            </div>
          ) : (
            <Link
              href={"/manual/" + section.slug + "/" + article.slug}
              key={article.slug}
              className={cn(
                "text-sm w-full ring-0 outline-none group",
                currentArticle == article.slug
                  ? "text-primary border-solid"
                  : "",
              )}
            >
              <span className="pressed link text-black font-normal hover:text-primary">
                {article.title}
              </span>
            </Link>
          ),
        )}
    </div>
  );
}
