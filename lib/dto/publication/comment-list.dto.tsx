import CommentDTO from "./comment.dto";

export default interface CommentListDTO {
  comment_list: Array<CommentDTO>;
  page: number;
  page_size: number;
  total: number;
  total_pages: number;
}
