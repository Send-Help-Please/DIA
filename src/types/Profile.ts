export type Profile = {
    id: string;
    displayName: string;
    avatarUrl?: string;
    weekStartsOn: number;
    createdAt: string;
    updatedAt?: string;
}

export type ProfileDTO = {
    id: string;
    display_name: string;
    avatar_url?: string;
    week_starts_on: number;
    created_at: string;
    updated_at?: string;
}

export type CreateProfilePayload = {
  displayName: string;
  avatarUrl?: string;
  weekStartsOn: number;
}

export type CreateProfileInput = {
  display_name: string;
  avatar_url?: string;
  week_starts_on: number;
}