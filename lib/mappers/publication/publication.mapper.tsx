import PublicationDTO from "@/lib/dto/publication/publication.dto";
import { toSongInfoDTO } from "../song-info/song-info.mapper";

export default function toPublicationDTO(row: any): PublicationDTO {
  return {
    publication_id: row.publication_id,
    user_id: row.user_id,
    user_name: row.user_name,
    ...toSongInfoDTO(row),
  };
}
