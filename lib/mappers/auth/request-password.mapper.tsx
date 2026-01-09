import { RequestPasswordDTO } from "@/lib/dto/auth/request-password.dto";

export function toRequestPasswordDTO(row: any): RequestPasswordDTO {
  return {
    email: row.email,
    redirectTo: row.redirectTo,
  };
}
