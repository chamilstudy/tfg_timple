import { RequestPasswordDTO } from "@/lib/dto/auth/request-password.dto";

export default function toRequestPasswordDTO(row: any): RequestPasswordDTO {
  return {
    email: row.email,
    redirectTo: row.redirectTo,
  };
}
