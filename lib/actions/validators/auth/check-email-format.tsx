import DomainResponseDTO from "@/lib/dto/domain-response/domain-response.dto";
import toDomainResponseDTO from "@/lib/mappers/domain-response/domain-response.mapper";
import toErrorDto from "@/lib/mappers/error/error.mapper";

export default function checkEmailFormat(email: string): DomainResponseDTO {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("email", "INVALID"),
    });

  return toDomainResponseDTO({});
}
