import DomainResponseDTO from "@/lib/dto/domain-response/domain-response.dto";
import toDomainResponseDTO from "@/lib/mappers/domain-response/domain-response.mapper";
import toErrorDto from "@/lib/mappers/error/error.mapper";

export default function checkDescriptionFormat(
  description: string,
): DomainResponseDTO {
  if (description.length > 150)
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("description", "TOO_LONG"),
    });

  return toDomainResponseDTO({});
}
