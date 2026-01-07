export type AuthErrorFields = {
  email?: string;
  userName?: string;
  password?: string;
  unknown?: string;
};

export enum AuthErrorCode {
  USERNAME_TAKEN = "USERNAME_TAKEN",
  USERNAME_TOO_LONG = "USERNAME_TOO_LONG",
  PASSWORD_TOO_SHORT = "PASSWORD_TOO_SHORT",
  PASSWORD_NOT_MATCH = "PASSWORD_NOT_MATCH",
  INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
  INVALID_EMAIL = "INVALID_EMAIL",
  UNKNOWN = "UNKNOWN",
}

export const authErrorMap: Record<AuthErrorCode, AuthErrorFields> = {
  USERNAME_TOO_LONG: { userName: "El nombre de usuario es demasiado largo" },
  USERNAME_TAKEN: { userName: "El nombre de usuario ya existe" },
  PASSWORD_TOO_SHORT: { password: "La contraseña es muy corta" },
  PASSWORD_NOT_MATCH: { password: "Las contraseñas no coinciden" },
  INVALID_CREDENTIALS: { unknown: "Las credenciales no son validas" },
  INVALID_EMAIL: { email: "El email no es correcto" },
  UNKNOWN: { unknown: "Error desconocido" },
};
