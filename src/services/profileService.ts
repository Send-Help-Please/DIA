import { ProfileRepository } from "@/repositories/profileRepository";
import { CreateProfilePayload } from "@/types/Profile";

class ProfileService {
  private profileRepo = new ProfileRepository();

  async getProfile() {
    return await this.profileRepo.getProfile();
  }

  async createProfile(payload: CreateProfilePayload) {
    return await this.profileRepo.createProfile(payload);
  }
}

export const profileService = new ProfileService();