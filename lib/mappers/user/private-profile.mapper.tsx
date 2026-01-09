import { PrivateProfileDTO } from "@/lib/dto/user/private-profile.dto";
import { PublicProfileDTO } from "@/lib/dto/user/public-profile.dto";
import { toPublicProfileDTO } from "./public-profile.mapper";

export function toPrivateProfileDTO(
  publicProfileData: any,
  row: any
): PrivateProfileDTO {
  const publicDTO: PublicProfileDTO = toPublicProfileDTO(publicProfileData);
  return {
    ...publicDTO,
    email: row.email,
  };
}
