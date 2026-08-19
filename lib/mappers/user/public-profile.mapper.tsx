// Formatters
import timeAgo from "@/lib/actions/formatters/time.formatter";

// DTOs
import PublicProfileDTO from "@/lib/dto/user/public-profile.dto";

// Validators
import toPublicationDTO from "../publication/publication.mapper";
import toSongRequestDTO from "../song-request/song-request.mapper";

export default function toPublicProfileDTO(row: any): PublicProfileDTO {
  return {
    user_id: row.user_id,
    user_name: row.user_name,
    description: row.description || "Aún no tienes descripción...",
    created_at_raw: row.created_at,
    created_at: timeAgo(row.created_at),
    publications: row.publications.map((publication: any) => {
      return toPublicationDTO(publication);
    }),
    requests: row.requests.map((request: any) => {
      return toSongRequestDTO(request);
    }),
  };
}
