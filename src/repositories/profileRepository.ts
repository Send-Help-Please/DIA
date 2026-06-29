import { CreateProfileInput, CreateProfilePayload, Profile, ProfileDTO } from "@/types/Profile";
import { invoke } from "@tauri-apps/api/core";

export class ProfileRepository {
    private mapCreateProfileToInput(payload: CreateProfilePayload): CreateProfileInput {
        return {
            display_name: payload.displayName,
            avatar_url: payload.avatarUrl,
            week_starts_on: payload.weekStartsOn
        }
    }

    private mapDTOToProfile(dto: ProfileDTO): Profile {
        return {
            id: dto.id,
            displayName: dto.display_name,
            avatarUrl: dto.avatar_url,
            weekStartsOn: dto.week_starts_on,
            createdAt: dto.created_at,
            updatedAt: dto.updated_at
        }
    }

    async createProfile(payload: CreateProfilePayload): Promise<Profile> {
        const input = this.mapCreateProfileToInput(payload);

        const profileDTO = await invoke("create_profile", { input }) as ProfileDTO;

        return this.mapDTOToProfile(profileDTO);
    }

    async getProfile(): Promise<Profile | null> {
        const profileDTO = await invoke("get_profile", {}) as ProfileDTO | null;

        return profileDTO ? this.mapDTOToProfile(profileDTO) : profileDTO;
    }
}