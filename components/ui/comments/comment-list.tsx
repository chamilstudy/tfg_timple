import Comment from "./comment";
import CommentListToolBar from "./comment-list-toolbar";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchCommentsAction } from "@/lib/domains/publication/fetch-comments-by-publication-id";
import CommentListDTO from "@/lib/dto/publication/comment-list.dto";
import toCommentListDTO from "@/lib/mappers/publication/comment-list.mapper";

import PageNumber from "../input/page-number";

import GeneralEmptyFetchCard from "../info/general-empty-fetch-card";
import { CommentForm } from "./comment-form";
import CommentListSkeleton from "./comment-list-skeleton";

export default function CommentList() {
  const searchParams = useSearchParams();
  const publicationId = searchParams.get("publication-id") ?? "";
  const sort = searchParams.get("sort") ?? "";
  const page = searchParams.get("page") ?? "";

  // hooks
  const [commentList, setCommentList] = useState<CommentListDTO>(
    toCommentListDTO({
      comment_list: [],
      page: 0,
      page_size: 0,
      total: 0,
      total_pages: 0,
    }),
  );
  const [isLoading, setIsLoading] = useState(true);

  async function fetchComments() {
    setIsLoading(true);
    const response = await fetchCommentsAction({
      publicationId: publicationId,
      sort: sort,
      page: Number(page),
    });

    setCommentList(response.data);

    setIsLoading(false);
  }

  useEffect(() => {
    fetchComments();
  }, [publicationId, sort, page]);

  return (
    <div className="flex flex-col gap-8 items-center w-full" id="comments">
      <div className="w-full self-start">
        <h3 className="font-bold">Comentarios</h3>
        <p>Aquí encontrás una lista de comentarios sobre la publicación</p>
      </div>

      <CommentListToolBar isLoading={isLoading} scrollTo="comments" />
      <div className="flex flex-col flex-nowrap gap-3 w-full">
        {isLoading ? (
          <div className="loading-text h-1rem w-32 self-end" />
        ) : (
          <p className="text-xs w-full flex justify-end ">
            Se han encontrado {commentList.total} comentarios
          </p>
        )}
        <CommentForm onSubmit={fetchComments} />
        {isLoading ? (
          <CommentListSkeleton />
        ) : commentList.total ? (
          commentList.comment_list.map((comment, index) => (
            <Comment
              key={index}
              commentData={comment}
              onChange={fetchComments}
            />
          ))
        ) : (
          <GeneralEmptyFetchCard message="¡Sé el primero en comentar!" />
        )}
      </div>
      <PageNumber
        scrollTo="comments"
        startPage={1}
        endPage={commentList.total_pages}
      />
    </div>
  );
}
