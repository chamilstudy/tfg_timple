import SongRequestDTO from "./song-request.dto";

export default interface SongRequestListDTO {
  song_request_list: Array<SongRequestDTO>;
  page: number;
  page_size: number;
  total: number;
  total_pages: number;
}
