import { UpdatePasswordDTO } from "@/lib/dto/auth/update-password.dto";

export default function toUpdatePasswordDTO(row: any): UpdatePasswordDTO {
  return {
    password: row.password,
  };
}
