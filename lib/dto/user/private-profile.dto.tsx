import PublicProfileDTO from "@/lib/dto/user/public-profile.dto";

export default interface PrivateProfileDTO extends PublicProfileDTO {
  email: string;
}
