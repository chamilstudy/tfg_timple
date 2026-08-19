"use server";

import { createClient } from "@/lib/supabase/server";

// Formatters
import {
  publicationBodyFormatter,
  replaceChordLines,
} from "@/lib/actions/formatters/publication-body.formatter";

// Validators
import songChordsValidator from "@/lib/actions/validators/publication/song-chords.validator";
import songBodyValidator from "@/lib/actions/validators/publication/song-body.validator";
import validateFields from "@/lib/actions/validators/validate.validator";

// DTOs
import DomainResponseDTO from "@/lib/dto/domain-response/domain-response.dto";

// Mappers
import toDomainResponseDTO from "@/lib/mappers/domain-response/domain-response.mapper";
import toErrorDto from "@/lib/mappers/error/error.mapper";

type EditPublicationArgs = {
  publication_id: string;
  body: string;
};

export default async function editPublicationAction({
  publication_id,
  body,
}: EditPublicationArgs): Promise<DomainResponseDTO> {
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

  const { error: editPublicationError } = await supabase.rpc(
    "edit_publication",
    {
      p_publication_id: publication_id,
      p_body: bodyFormatted,
      p_chords: chordsFormatted,
    },
  );

  if (editPublicationError) {
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("unknown", "UNKNOWN"),
    });
  }

  return toDomainResponseDTO({});
}
