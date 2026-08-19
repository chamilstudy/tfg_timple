import SongInfoDTO from "../song-info/song-info.dto";

export default interface SongRequestDTO extends SongInfoDTO {
  request_id: string;
  requester_id: string;
  requester_user_name: string;
}
