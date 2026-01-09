import { UpdateDescriptionDTO } from "@/lib/dto/user/update-description.dto";

export function toUpdateDescriptionDTO(row: any): UpdateDescriptionDTO {
  return { description: row.description };
}
