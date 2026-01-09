import { PublicProfileDTO } from "@/lib/dto/user/public-profile.dto";

export interface PrivateProfileDTO extends PublicProfileDTO {
  email: string;
}
