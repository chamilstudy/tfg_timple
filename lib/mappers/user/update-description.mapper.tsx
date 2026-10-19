import { UpdateDescriptionDTO } from "@/lib/dto/user-profile/update-description.dto";

export default function toUpdateDescriptionDTO(row: any): UpdateDescriptionDTO {
  return { description: row.description };
}
