export type UserErrorFields = {
  session?: string;
  user_not_found?: string;
  description?: string;
  unknown?: string;
};

export enum UserErrorCode {
  INVALID_SESSION = "INVALID_SESSION",
  USER_NOT_FOUND = "USER_NOT_FOUND",
  DESCRIPTION_TOO_LONG = "DESCRIPTION_TOO_LONG",
  UNKNOWN = "UNKNOWN",
}

export const userErrorMap: Record<UserErrorCode, UserErrorFields> = {
  INVALID_SESSION: { session: "La sesión no es valida" },
  USER_NOT_FOUND: { user_not_found: "Usuario no encontrado" },
  DESCRIPTION_TOO_LONG: { description: "El nombre de usuario ya existe" },
  UNKNOWN: { unknown: "Error desconocido" },
};
