// DTOs
import DomainResponseDTO from "@/lib/dto/domain-response/domain-response.dto";

// Mappers
import toDomainResponseDTO from "@/lib/mappers/domain-response/domain-response.mapper";
import toErrorDto from "@/lib/mappers/error/error.mapper";

export default function songAlbumValidator(
  songAlbum: string,
): DomainResponseDTO {
  if (songAlbum.length > 1 && songAlbum.length < 3) {
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("album", "TOO_SHORT"),
    });
  }

  if (songAlbum.length > 32) {
    return toDomainResponseDTO({
      success: false,
      error: toErrorDto("album", "TOO_LONG"),
    });
  }

  return toDomainResponseDTO({ success: true });
}
