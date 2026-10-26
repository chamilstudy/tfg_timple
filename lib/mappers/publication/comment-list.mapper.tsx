import toCommentDTO from "./comment.mapper";
import CommentListDTO from "@/lib/dto/publication/comment-list.dto";

export default function toCommentListDTO(row: any): CommentListDTO {
  return {
    comment_list: row.comment_list.map(toCommentDTO),
    page: row.page,
    page_size: row.page_size,
    total: row.total,
    total_pages: row.total_pages,
  };
}
