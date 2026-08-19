import { UpdateEmailDTO } from "@/lib/dto/auth/update-email.dto";

export default function toUpdateEmailDTO(row: any): UpdateEmailDTO {
  return {
    email: row.email,
  };
}
