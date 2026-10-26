import timeAgo from "@/lib/actions/formatters/time.formatter";
import CommentDTO from "@/lib/dto/publication/comment.dto";

export default function toCommentDTO(row: any): CommentDTO {
  return {
    comment_id: row.comment_id,
    publication_id: row.publication_id,
    user_id: row.user_id,
    user_name: row.user_name,
    comment: row.comment,
    created_at_raw: row.created_at,
    created_at: timeAgo(row.created_at),
    last_edit_raw: row.last_edit,
    last_edit: timeAgo(row.last_edit),
  };
}
