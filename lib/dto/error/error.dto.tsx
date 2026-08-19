import { ErrorField } from "@/lib/errors/error";

export interface ErrorDTO {
  field: ErrorField;
  message: string;
}
