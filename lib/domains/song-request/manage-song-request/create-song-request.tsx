"use server";

import { createClient } from "@/lib/supabase/server";

// Validators
import songNameValidator from "@/lib/actions/validators/publication/song-name.validator";
import songAuthorValidator from "@/lib/actions/validators/publication/song-author.validator";
import songAlbumValidator from "@/lib/actions/validators/publication/song-album.validator";
import songGenresValidator from "@/lib/actions/validators/publication/song-genres.validators";
import validateFields from "@/lib/actions/validators/validate.validator";

// DTOs
import DomainResponseDTO from "@/lib/dto/domain-response/domain-response.dto";

// Mappers
import toDomainResponseDTO from "@/lib/mappers/domain-response/domain-response.mapper";
import toErrorDto from "@/lib/mappers/error/error.mapper";

type CreateSongRequestArgs = {
  songName: string;
  album: string;
  author: string;
  genres: Array<string>;
};

export default async function createSongRequestAction({
  songName,
  album,
  author,
  genres,
}: CreateSongRequestArgs): Promise<DomainResponseDTO> {
  const supabase = await createClient();

  const validationResult = validateFields([
    () => songNameValidator(songName),
    () => songAuthorValidator(author),
    () => songAlbumValidator(album),
    () => songGenresValidator(genres),
  ]);

  if (!validationResult) {
    return validationResult;
  }

  const { error: requestError } = await supabase.rpc("create_song_request", {
    p_song_name: songName,
    p_album: album,
    p_author: author,
    p_genres: genres,
  });

  if (requestError) {
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("unknown", "UNKNOWN"),
    });
  }

  return toDomainResponseDTO({});
}
