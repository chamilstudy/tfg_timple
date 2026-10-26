"use client";

// next
import { useEffect, useState } from "react";
import { notFound, useSearchParams } from "next/navigation";

// icons
import { TriangleAlert } from "lucide-react";

// components
import PageNumber from "../input/page-number";
import ListToolBar from "./list-tool-bar";
import SongRequestCard from "./song-request-card";
import PublicationListSkeleton from "./publication-list-skeleton";
import GeneralEmptyFetchCard from "../info/general-empty-fetch-card";

// dtos
import SongRequestListDTO from "@/lib/dto/song-request/song-request-list.dto";

// mappers
import toSongRequestListDTO from "@/lib/mappers/song-request/song-request-list.mapper";

// domains
import fetchSongRequestListAction from "@/lib/domains/song-request/fetch-song-request-list";

type SongRequestListProps = {
  showToolBar?: boolean;
  showPageNumber?: boolean;
  showFinds?: boolean;
  maxSongRequests?: number;
};

export default function SongRequestList({
  showToolBar,
  showPageNumber,
  showFinds,
  maxSongRequests,
}: SongRequestListProps) {
  const [isLoading, setIsLoading] = useState(true);

  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") ?? 0);
  const search = searchParams.get("search") ?? "";
  const sort = searchParams.get("sort") ?? "newest";
  const genre = searchParams.get("genre") ?? "";
  const userName = searchParams.get("user_name") ?? "";

  const [songRequestListData, setSongRequestListData] =
    useState<SongRequestListDTO>(
      toSongRequestListDTO({
        song_request_list: [],
        page: 0,
        page_size: 0,
        total: 0,
        total_pages: 0,
      }),
    );

  const fetchSongRequestList = async () => {
    setIsLoading(true);

    const fetchSongRequestListResponse = await fetchSongRequestListAction({
      userName: userName,
      genre: genre,
      max_publications: maxSongRequests,
      search: search,
      sort: sort,
      page: page,
    });

    if (!fetchSongRequestListResponse.success) {
      notFound();
    }

    setSongRequestListData(fetchSongRequestListResponse.data);

    setIsLoading(false);
  };

  useEffect(() => {
    fetchSongRequestList();
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
                Se han encontrado {songRequestListData.total} solicitudes
              </p>
            )}
            {songRequestListData.total != 0 ? (
              songRequestListData.song_request_list.map((song_request) => (
                <SongRequestCard
                  key={song_request.request_id}
                  songRequestListData={song_request}
                  onChange={fetchSongRequestList}
                />
              ))
            ) : (
              <GeneralEmptyFetchCard />
            )}
          </div>
          {showPageNumber && songRequestListData.total_pages > 1 && (
            <PageNumber
              startPage={1}
              endPage={songRequestListData.total_pages}
            />
          )}
        </>
      )}
    </div>
  );
}
