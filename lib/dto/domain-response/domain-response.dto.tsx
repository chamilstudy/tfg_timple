import { ErrorDTO } from "../error/error.dto";

export default interface DomainResponseDTO {
  success: boolean;
  data: any;
  error: ErrorDTO;
}
