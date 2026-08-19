// DTOs
import DomainResponseDTO from "@/lib/dto/domain-response/domain-response.dto";

// Mappers
import toDomainResponseDTO from "@/lib/mappers/domain-response/domain-response.mapper";

type FieldValidator = () => DomainResponseDTO;

export default function validateFields(
  validators: FieldValidator[],
): DomainResponseDTO {
  for (const validator of validators) {
    const result = validator();

    if (!result.success) {
      return result;
    }
  }

  return toDomainResponseDTO({ success: true });
}
