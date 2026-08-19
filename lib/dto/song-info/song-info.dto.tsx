export default interface SongInfoDTO {
  song_name: string;
  album: string;
  author: string;
  genres: Array<string>;
  body: string;
  chords: Record<
    string,
    Record<string, Record<string, Record<string, number[]>>>
  >;
  created_at: string;
  created_at_raw: string;
  last_edit: string;
  last_edit_raw: string;
}
