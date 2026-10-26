"use client";

// next
import { useEffect, useState } from "react";
import { notFound, useSearchParams } from "next/navigation";

// icons
import { TriangleAlert } from "lucide-react";

// DTOs
import PublicationListDTO from "@/lib/dto/publication/publication-list.dto";

// mappers
import toPublicationListDTO from "@/lib/mappers/publication/publication-list.mapper";

// actions
import fetchPublicationListAction from "@/lib/domains/publication/fetch-publication-list";

// components
import PublicationCard from "./publication-card";
import PageNumber from "../input/page-number";
import ListToolBar from "./list-tool-bar";
import PublicationListSkeleton from "./publication-list-skeleton";
import GeneralEmptyFetchCard from "../info/general-empty-fetch-card";

type PublicationListProps = {
  showToolBar?: boolean;
  showPageNumber?: boolean;
  showFinds?: boolean;
  maxPublications?: number;
};

export default function PublicationList({
  showToolBar,
  showPageNumber,
  showFinds,
  maxPublications,
}: PublicationListProps) {
  const [isLoading, setIsLoading] = useState(true);

  // params
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") ?? "0");
  const search = searchParams.get("search") ?? "";
  const sort = searchParams.get("sort") ?? "newest";
  const genre = searchParams.get("genre") ?? "";
  const userName = searchParams.get("user_name") ?? "";

  // hooks
  const [publicationListData, setPublicationListData] =
    useState<PublicationListDTO>(
      toPublicationListDTO({
        publication_list: [],
        page: 0,
        page_size: 0,
        total: 0,
        total_pages: 0,
      }),
    );

  // functions
  const fetchPublicationListData = async () => {
    setIsLoading(true);

    const fetchPublicationListResponse = await fetchPublicationListAction({
      user_name: userName,
      genre: genre,
      max_publications: maxPublications,
      search: search,
      sort: sort,
      page: page,
    });

    if (!fetchPublicationListResponse.success) {
      notFound();
    }

    setPublicationListData(fetchPublicationListResponse.data);

    setIsLoading(false);
  };

  useEffect(() => {
    fetchPublicationListData();
  }, [search, page, genre, sort, userName]);

  return (
    <div className="w-full flex flex-col flex-nowrap gap-8">
      {showToolBar && <ListToolBar isLoading={isLoading} />}
      {isLoading ? (
        <PublicationListSkeleton />
      ) : (
        <>
          <div className="w-full flex flex-col flex-nowrap gap-2">
            {showFinds && (
              <p className="text-xs w-full flex justify-end ">
                Se han encontrado {publicationListData.total} canciones
              </p>
            )}
            {publicationListData.total ? (
              publicationListData.publication_list.map((publicationData) => (
                <PublicationCard
                  key={publicationData.publication_id}
                  publicationData={publicationData}
                  onChange={fetchPublicationListData}
                />
              ))
            ) : (
              <GeneralEmptyFetchCard />
            )}
          </div>
          {showPageNumber && publicationListData.total_pages > 1 && (
            <PageNumber
              startPage={1}
              endPage={publicationListData.total_pages}
            />
          )}
        </>
      )}
    </div>
  );
}
