// Formatters
import timeAgo from "@/lib/actions/formatters/time.formatter";

// DTOs
import PublicProfileDTO from "@/lib/dto/profile/public-profile.dto";

// Validators
import toPublicationListDTO from "../publication/publication-list.mapper";
import toSongRequestListDTO from "../song-request/song-request-list.mapper";

export default function toPublicProfileDTO(row: any): PublicProfileDTO {
  return {
    user_id: row.user_id,
    user_name: row.user_name,
    description: row.description || "Aún no tienes descripción...",
    created_at_raw: row.created_at,
    created_at: timeAgo(row.created_at),
  };
}
