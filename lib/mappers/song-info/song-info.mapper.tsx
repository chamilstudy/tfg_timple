import timeAgo from "@/lib/actions/formatters/time.formatter";
import SongInfoDTO from "@/lib/dto/song-info/song-info.dto";

export function toSongInfoDTO(row: any): SongInfoDTO {
  return {
    song_name: row.song_name,
    album: row.album ? row.album : "Sin album",
    author: row.author ? row.author : "Desconocido",
    genres: row.genres,
    body: row.body,
    chords: row.chords,
    created_at_raw: row.created_at,
    created_at: timeAgo(row.created_at),
    last_edit_raw: row.last_edit,
    last_edit: timeAgo(row.last_edit),
  };
}
