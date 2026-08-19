import { SongRequestsDTO } from "@/lib/dto/song-request/song-requests.dto";
import toSongRequestDTO from "./song-request.mapper";

export default function toSongRequestsDTO(row: any): SongRequestsDTO {
  return row.map((request: any) => {
    return toSongRequestDTO(request);
  });
}
