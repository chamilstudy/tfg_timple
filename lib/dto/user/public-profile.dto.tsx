import PublicationDTO from "../publication/publication.dto";
import SongRequestDTO from "../song-request/song-request.dto";

export default interface PublicProfileDTO {
  user_id: string;
  user_name: string;
  description: string;
  created_at: string;
  created_at_raw: string;
  publications: Array<PublicationDTO>;
  requests: Array<SongRequestDTO>;
}
