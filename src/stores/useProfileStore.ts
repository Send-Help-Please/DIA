import { defineStore } from "pinia";
import { ref } from "vue";

export const useProfileStore = defineStore('profile', () => {
    const id = ref<string>();
    const displayName = ref<string>();
    const timezone = ref<string>();
    const weekStartsOn = ref<number>();
    const createdAt = ref<Date>();
    const updatedAt = ref<Date>();

    return {
        id,
        displayName,
        timezone,
        weekStartsOn,
        createdAt,
        updatedAt
    }
});