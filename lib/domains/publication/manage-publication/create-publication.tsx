"use server";

import { createClient } from "@/lib/supabase/server";

// Formatters
import {
  publicationBodyFormatter,
  replaceChordLines,
} from "@/lib/actions/formatters/publication-body.formatter";

// Validators
import songNameValidator from "@/lib/actions/validators/publication/song-name.validator";
import songAuthorValidator from "@/lib/actions/validators/publication/song-author.validator";
import songAlbumValidator from "@/lib/actions/validators/publication/song-album.validator";
import songGenresValidator from "@/lib/actions/validators/publication/song-genres.validators";
import songChordsValidator from "@/lib/actions/validators/publication/song-chords.validator";
import songBodyValidator from "@/lib/actions/validators/publication/song-body.validator";
import validateFields from "@/lib/actions/validators/validate.validator";

// DTOs
import DomainResponseDTO from "@/lib/dto/domain-response/domain-response.dto";

// Mappers
import toDomainResponseDTO from "@/lib/mappers/domain-response/domain-response.mapper";
import toErrorDto from "@/lib/mappers/error/error.mapper";

type CreatePublicationArgs = {
  songName: string;
  album: string;
  author: string;
  genres: Array<string>;
  body: string;
};

export default async function createPublicationAction({
  songName,
  album,
  author,
  genres,
  body,
}: CreatePublicationArgs): Promise<DomainResponseDTO> {
  const supabase = await createClient();

  const chordsFormatted = publicationBodyFormatter(body);
  const bodyFormatted = replaceChordLines(body);
  
  const validationResult = validateFields([
    () => songNameValidator(songName),
    () => songAuthorValidator(author),
    () => songAlbumValidator(album),
    () => songGenresValidator(genres),
    () => songBodyValidator(body),
    () => songChordsValidator(chordsFormatted),
  ]);

  if (validationResult.error) {
    return toDomainResponseDTO(validationResult);
  }

  const { error: createPublicationError } = await supabase.rpc(
    "create_publication",
    {
      p_song_name: songName,
      p_album: album,
      p_author: author,
      p_genres: genres,
      p_body: bodyFormatted,
      p_chords: chordsFormatted,
    },
  );

  if (createPublicationError) {
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("unknown", "UNKNOWN"),
    });
  }

  return toDomainResponseDTO({});
}
