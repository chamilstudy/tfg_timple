import { UpdatePasswordDTO } from "@/lib/dto/auth/update-password.dto";

export function toUpdatePasswordDTO(row: any) {
  return {
    password: row.password,
  };
}
