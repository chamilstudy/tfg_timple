// DTOs
import DomainResponseDTO from "@/lib/dto/domain-response/domain-response.dto";

// Mappers
import toDomainResponseDTO from "@/lib/mappers/domain-response/domain-response.mapper";
import toErrorDto from "@/lib/mappers/error/error.mapper";

export default function songAuthorValidator(
  songAuthor: string,
): DomainResponseDTO {
  if (songAuthor.length > 1 && songAuthor.length < 3) {
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("author", "TOO_SHORT"),
    });
  }

  if (songAuthor.length > 32) {
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("author", "TOO_LONG"),
    });
  }

  return toDomainResponseDTO({ success: true });
}
