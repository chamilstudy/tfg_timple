// DTOs
import DomainResponseDTO from "@/lib/dto/domain-response/domain-response.dto";

// Mappers
import toDomainResponseDTO from "@/lib/mappers/domain-response/domain-response.mapper";
import toErrorDto from "@/lib/mappers/error/error.mapper";

export default function commentValidator(comment: string): DomainResponseDTO {
  if (comment.length < 1) {
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("comment", "EMPTY"),
    });
  }

  if (comment.length < 10) {
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("comment", "TOO_SHORT"),
    });
  }

  if (comment.length > 150) {
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("comment", "TOO_LONG"),
    });
  }

  return toDomainResponseDTO({});
}
