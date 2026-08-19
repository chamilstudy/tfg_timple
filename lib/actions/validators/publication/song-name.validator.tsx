// DTOs
import DomainResponseDTO from "@/lib/dto/domain-response/domain-response.dto";

// Mappers
import toDomainResponseDTO from "@/lib/mappers/domain-response/domain-response.mapper";
import toErrorDto from "@/lib/mappers/error/error.mapper";

export default function songNameValidator(songName: string): DomainResponseDTO {
  if (songName.length < 1) {
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("name", "EMPTY"),
    });
  }

  if (songName.length < 3) {
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("name", "TOO_SHORT"),
    });
  }

  if (songName.length > 32) {
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("name", "TOO_LONG"),
    });
  }

  return toDomainResponseDTO({});
}
