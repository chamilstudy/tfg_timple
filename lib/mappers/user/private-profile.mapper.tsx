import PrivateProfileDTO from "@/lib/dto/profile/private-profile.dto";
import timeAgo from "@/lib/actions/formatters/time.formatter";

export function toPrivateProfileDTO(row: any): PrivateProfileDTO {
  return {
    user_id: row.profile_id,
    user_name: row.user_name,
    description: row.description || "Aún no tienes descripción...",
    created_at_raw: row.created_at,
    created_at: timeAgo(row.created_at),
    email: row.email,
  };
}
