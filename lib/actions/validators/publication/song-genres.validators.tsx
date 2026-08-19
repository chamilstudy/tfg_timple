// DTOs
import DomainResponseDTO from "@/lib/dto/domain-response/domain-response.dto";

// Mappers
import toDomainResponseDTO from "@/lib/mappers/domain-response/domain-response.mapper";
import toErrorDto from "@/lib/mappers/error/error.mapper";

// Utils
import { genres } from "../../utils/genres.util";

export default function songGenresValidator(
  songGenres: string[],
): DomainResponseDTO {
  const songGenresUnique = new Set(songGenres);

  const invalidGenre = Array.from(songGenresUnique).some(
    (genre) => !genres.includes(genre),
  );

  if (invalidGenre) {
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("genres", "INVALID"),
    });
  }

  if (songGenresUnique.size < 1) {
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("genres", "NOT_MATCH"),
    });
  }

  return toDomainResponseDTO({ success: true });
}
