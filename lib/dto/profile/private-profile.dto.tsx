import PublicProfileDTO from "@/lib/dto/profile/public-profile.dto";

export default interface PrivateProfileDTO {
  email: string;
  user_id: string;
  user_name: string;
  description: string;
  created_at_raw: string;
  created_at: string;
}
