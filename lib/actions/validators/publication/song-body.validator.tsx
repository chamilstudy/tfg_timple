// DTOs
import DomainResponseDTO from "@/lib/dto/domain-response/domain-response.dto";

// Mappers
import toDomainResponseDTO from "@/lib/mappers/domain-response/domain-response.mapper";
import toErrorDto from "@/lib/mappers/error/error.mapper";

export default function songBodyValidator(songBody: string): DomainResponseDTO {
  if (songBody.length === 0) {
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("body", "EMPTY"),
    });
  }

  if (songBody.length < 300) {
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("body", "TOO_SHORT"),
    });
  }

  if (songBody.length > 5000) {
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("body", "TOO_LONG"),
    });
  }

  return toDomainResponseDTO({ success: true });
}
