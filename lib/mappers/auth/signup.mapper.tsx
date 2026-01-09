import { SignUpDTO } from "@/lib/dto/auth/signup.dto";

export function toSignUpDTO(row: any): SignUpDTO {
  return {
    email: row.email,
    password: row.password,
    options: {
      data: {
        user_name: row.user_name,
      },
    },
  };
}
