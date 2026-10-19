import PublicationListDTO from "../publication/publication-list.dto";
import PublicationDTO from "../publication/publication.dto";
import SongRequestListDTO from "../song-request/song-request-list.dto";
import SongRequestDTO from "../song-request/song-request.dto";

export default interface PublicProfileDTO {
  user_id: string;
  user_name: string;
  description: string;
  created_at: string;
  created_at_raw: string;
}
