import DomainResponseDTO from "@/lib/dto/domain-response/domain-response.dto";

import toDomainResponseDTO from "@/lib/mappers/domain-response/domain-response.mapper";
import toErrorDto from "@/lib/mappers/error/error.mapper";

export default function checkPasswordFormat(
  password: string,
): DomainResponseDTO {
  if (password.length < 6)
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("password", "TOO_SHORT"),
    });

  return toDomainResponseDTO({});
}
