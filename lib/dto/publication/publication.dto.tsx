import SongInfoDTO from "@/lib/dto/song-info/song-info.dto";

export default interface PublicationDTO extends SongInfoDTO {
  publication_id: string;
  user_id: string;
  user_name: string;
}
