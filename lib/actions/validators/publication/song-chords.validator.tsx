// DTOs
import DomainResponseDTO from "@/lib/dto/domain-response/domain-response.dto";

// Mappers
import toDomainResponseDTO from "@/lib/mappers/domain-response/domain-response.mapper";
import toErrorDto from "@/lib/mappers/error/error.mapper";

export default function songChordsValidator(
  songChords: Record<
    string,
    Record<string, Record<string, Record<string, number[]>>>
  >,
): DomainResponseDTO {
  if (Object.values(songChords["timple"]["0"]).length === 0) {
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("chords", "EMPTY"),
    });
  }

  if (Object.values(songChords["timple"]["0"]["0"]).length === 0) {
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("chords", "EMPTY"),
    });
  }

  return toDomainResponseDTO({ success: true });
}
