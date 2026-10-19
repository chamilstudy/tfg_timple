import SongRequestListDTO from "@/lib/dto/song-request/song-request-list.dto";
import toSongRequestDTO from "./song-request.mapper";

export default function toSongRequestListDTO(row: any): SongRequestListDTO {
  return {
    song_request_list: row.song_request_list.map(toSongRequestDTO),
    page: row.page,
    page_size: row.page_size,
    total: row.total,
    total_pages: row.total_pages,
  };
}
