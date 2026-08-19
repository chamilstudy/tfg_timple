// DTOs
import DomainResponseDTO from "@/lib/dto/domain-response/domain-response.dto";

// Mappers
import toDomainResponseDTO from "@/lib/mappers/domain-response/domain-response.mapper";
import toErrorDto from "@/lib/mappers/error/error.mapper";

export default function checkUserNameFormat(
  userName: string,
): DomainResponseDTO {
  if (userName.length > 10)
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("name", "TOO_LONG"),
    });

  return toDomainResponseDTO({ success: true });
}
