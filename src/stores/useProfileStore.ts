import { Profile } from '@/types/Profile';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useProfileStore = defineStore('profile', () => {
    const profile = ref<Profile>();

    const profileId = computed(() => {
        if(!profile.value?.id) { throw new Error("Profile id not set"); }
        return profile.value.id;
    });

    const setProfile = (newProfile: Profile) => {
        profile.value = newProfile;
    }

    return {
        profile,
        profileId,

        setProfile
    };
});
