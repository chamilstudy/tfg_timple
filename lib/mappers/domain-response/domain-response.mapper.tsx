import DomainResponseDTO from "@/lib/dto/domain-response/domain-response.dto";

export default function toDomainResponseDTO(row: any): DomainResponseDTO {
  return {
    success: row.success == undefined ? true : row.success,
    data: row.data ? row.data : null,
    error: row.error ? row.error : null,
  };
}
