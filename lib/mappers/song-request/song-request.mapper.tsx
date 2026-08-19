import SongRequestDTO from "@/lib/dto/song-request/song-request.dto";
import { toSongInfoDTO } from "../song-info/song-info.mapper";

export default function toSongRequestDTO(row: any): SongRequestDTO {
  return {
    request_id: row.request_id,
    requester_id: row.requester_id,
    requester_user_name: row.user_name,
    ...toSongInfoDTO(row),
  };
}
