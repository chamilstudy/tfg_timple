export type ErrorField =
  | "name"
  | "description"
  | "password"
  | "email"
  | "chords"
  | "genres"
  | "author"
  | "album"
  | "body"
  | "unknown"
  | "fetch"
  | "session"
  | "report";

export type ErrorType =
  | "EMPTY"
  | "TOO_SHORT"
  | "TOO_LONG"
  | "INVALID"
  | "INVALID_CREDENTIALS"
  | "NOT_MATCH"
  | "UNKNOWN"
  | "ALREADY_EXISTS"
  | "NOT_FOUND"
  | "FAILED";

export type ErrorMessage = {
  [F in ErrorField]: {
    [T in ErrorType]?: string;
  };
};

export const errorMessages: ErrorMessage = {
  name: {
    TOO_SHORT: "El nombre es demasiado corto",
    TOO_LONG: "El nombre es demasiado largo",
    EMPTY: "El nombre no puede estar vacío",
    ALREADY_EXISTS: "El nombre ya está en uso",
    UNKNOWN: "Error desconocido",
  },
  description: {
    TOO_LONG: "La descripción es demasiado larga",
    EMPTY: "La descripción no puede estar vacía",
    UNKNOWN: "Error desconocido",
  },
  password: {
    TOO_SHORT: "La contraseña es demasiado corta",
    NOT_MATCH: "Las contraseñas no coinciden",
    UNKNOWN: "Error desconocido",
  },
  email: {
    INVALID: "El email no es válido",
    EMPTY: "El email no puede estar vacío",
    UNKNOWN: "Error desconocido",
  },
  chords: {
    EMPTY: "La canción no tiene acordes",
    UNKNOWN: "Error desconocido",
  },
  genres: {
    EMPTY: "No hay género definido",
    INVALID: "El género no es válido",
    UNKNOWN: "Error desconocido",
  },
  author: {
    TOO_LONG: "El nombre del autor es demasiado largo",
    TOO_SHORT: "El nombre del autor es demasiado corto",
    EMPTY: "El autor no puede estar vacío",
    UNKNOWN: "Error desconocido",
  },
  album: {
    TOO_LONG: "El nombre del álbum es demasiado largo",
    TOO_SHORT: "El nombre del álbum es demasiado corto",
    EMPTY: "El álbum no puede estar vacío",
    UNKNOWN: "Error desconocido",
  },
  body: {
    TOO_SHORT: "La letra es demasiado corta",
    TOO_LONG: "La letra es demasiado larga",
    EMPTY: "La canción no tiene letra",
    UNKNOWN: "Error desconocido",
  },
  session: {
    NOT_FOUND: "Usuario no encontrado",
    INVALID: "La sesión no es válida",
    INVALID_CREDENTIALS: "Las credenciales no son validas",
    UNKNOWN: "Error desconocido",
  },
  report: {
    NOT_FOUND: "El reporte no apunta a ningún usuario, publicación o solicitud",
    EMPTY: "El reporte no tiene razón",
    UNKNOWN: "Error desconocido",
  },
  fetch: {
    FAILED: "No se ha podido conectar con el servidor",
    NOT_FOUND: "No se han encontrado resultados",
    UNKNOWN: "Error desconocido",
  },
  unknown: {
    UNKNOWN: "Error desconocido",
  },
};
