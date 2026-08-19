import { LoginDTO } from "@/lib/dto/auth/login.dto";

export default function toLoginDTO(row: any): LoginDTO {
  return {
    email: row.email,
    password: row.password,
  };
}
