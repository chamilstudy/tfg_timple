import UpdateUsernameDTO from "@/lib/dto/user/update-username.dto";

export default function toUpdateUsernameDTO(row: any): UpdateUsernameDTO {
  return { user_name: row.user_name };
}
