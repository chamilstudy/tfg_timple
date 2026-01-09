import { UpdateEmailDTO } from "@/lib/dto/auth/update-email.dto";

export function toUpdateEmailDTO(row: any): UpdateEmailDTO {
  return {
    email: row.email,
  };
}
