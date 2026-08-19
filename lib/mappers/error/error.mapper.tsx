import { errorMessages, ErrorField, ErrorType } from "@/lib/errors/error";
import { ErrorDTO } from "@/lib/dto/error/error.dto";

export default function toErrorDto(
  field: ErrorField,
  type: ErrorType,
): ErrorDTO {
  const message = errorMessages[field][type] ?? "Error desconocido";
  return {
    field: field,
    message: message,
  };
}
