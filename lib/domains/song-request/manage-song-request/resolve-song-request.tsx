"use server";

import { createClient } from "@/lib/supabase/server";

// Formatters
import {
  publicationBodyFormatter,
  replaceChordLines,
} from "@/lib/actions/formatters/publication-body.formatter";

// Validators
import validateFields from "@/lib/actions/validators/validate.validator";
import songChordsValidator from "@/lib/actions/validators/publication/song-chords.validator";
import songBodyValidator from "@/lib/actions/validators/publication/song-body.validator";

// DTOs
import DomainResponseDTO from "@/lib/dto/domain-response/domain-response.dto";

// Mappers
import toDomainResponseDTO from "@/lib/mappers/domain-response/domain-response.mapper";
import toErrorDto from "@/lib/mappers/error/error.mapper";

type ResolveSongRequestArgs = {
  requestId: string;
  body: string;
};

export default async function resolveSongRequestAction({
  requestId,
  body,
}: ResolveSongRequestArgs): Promise<DomainResponseDTO> {
  const supabase = await createClient();

  const chordsFormatted = publicationBodyFormatter(body);
  const bodyFormatted = replaceChordLines(body);

  const validationResult = validateFields([
    () => songChordsValidator(chordsFormatted),
    () => songBodyValidator(body),
  ]);

  if (!validationResult) {
    return validationResult;
  }

  const { error: resolveSongRequestError } = await supabase.rpc(
    "resolve_song_request",
    {
      p_chords: chordsFormatted,
      p_body: bodyFormatted,
      p_request_id: requestId,
    },
  );

  if (resolveSongRequestError) {
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("unknown", "UNKNOWN"),
    });
  }

  return toDomainResponseDTO({});
}
