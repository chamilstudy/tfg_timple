import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import PageNumberSkeleton from "./page-number-skeleton";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

type PageNumberProps = {
  startPage: number;
  endPage: number;
};

export default function PageNumber({ startPage, endPage }: PageNumberProps) {
  const pathname = usePathname();
  const params = useSearchParams();
  const currentPage = Number(params.get("page")) || 1;

  const createPageUrl = (page: number) => {
    const setParams = new URLSearchParams(params.toString());
    setParams.set("page", page.toString());
    return `${pathname}?${setParams.toString()}`;
  };
  return (
    <div className="flex flex-row flex-nowrap gap-2 text-primary justify-center items-center">
      {currentPage > 1 ? (
        <Link
          className="pressed outline-none"
          href={createPageUrl(currentPage - 1)}
        >
          <ChevronLeft />
        </Link>
      ) : (
        <></>
      )}
      {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
        const pageNumber = startPage + index;

        return (
          <Link
            key={pageNumber}
            href={createPageUrl(pageNumber)}
            className={cn(
              "px-2 py-1 rounded ",
              currentPage === pageNumber
                ? "bg-primary text-white font-bold"
                : "pressed",
            )}
            tabIndex={currentPage == pageNumber ? 0 : 1}
          >
            {pageNumber}
          </Link>
        );
      })}
      {currentPage < endPage ? (
        <Link className="pressed" href={createPageUrl(currentPage + 1)}>
          <ChevronRight />
        </Link>
      ) : (
        <></>
      )}
    </div>
  );
}
