import { PublicProfileDTO } from "@/lib/dto/user/public-profile.dto";

export function toPublicProfileDTO(row: any): PublicProfileDTO {
  return {
    user_name: row.user_name,
    description: row.description || "Aún no tienes descripción...",
    created_at: new Date(row.created_at).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  };
}
