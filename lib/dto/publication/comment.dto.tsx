export default interface CommentDTO {
  comment_id: string;
  publication_id: string;
  user_id: string;
  user_name: string;
  comment: number;
  created_at_raw: string;
  created_at: string;
  last_edit_raw: string;
  last_edit: string;
}
