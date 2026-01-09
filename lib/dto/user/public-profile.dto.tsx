import z from "zod";

export interface PublicProfileDTO {
  user_name: z.ZodString;
  description: string;
  created_at: string;
}
