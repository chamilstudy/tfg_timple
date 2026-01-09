export interface SignUpDTO {
  email: string;
  password: string;
  options: {
    data: { user_name: string };
  };
}
