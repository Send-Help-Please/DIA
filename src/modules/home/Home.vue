<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import { Profile } from "@/types/Profile";
import CreateProfile from "./views/CreateProfile.vue";
import Section from "@/components/Section.vue";
import Button from "@/components/Button.vue";
import { profileService } from "@/services/profileService.ts";
import HeaderText from "@/components/HeaderText.vue";
import { useProfileStore } from "@/stores/useProfileStore.ts";

const router = useRouter();
const profileStore = useProfileStore();

const goToDashboard = async () => {
  await router.push("/dashboard");
}

const loading = ref(true);
const creatingDefault = ref(false);
const showCreateProfile = ref(false);
const profile = ref<Profile | null>(null);

onMounted(async () => {
  try {
    profile.value = await profileService.getProfile();

    if (profile.value) { 
      profileStore.setProfile(profile.value);
      goToDashboard();
    }
  } finally {
    loading.value = false;
  }
});

async function createDefaultProfile() {
  creatingDefault.value = true;
  try {
    profile.value = await profileService.createProfile({
      displayName: `User-${new Date().getTime()}`,
      weekStartsOn: 1,
    });

    profileStore.setProfile(profile.value);

    goToDashboard();
  } finally {
    creatingDefault.value = false;
  }
}
</script>

<template>
  <Section class="p-16 text-text">
    <div v-if="loading">
      Loading...
    </div>

    <CreateProfile 
      v-else-if="showCreateProfile" 
      :go-to-dashboard="goToDashboard"
      :set-profile="profileStore.setProfile" 
    />

    <div v-else-if="!profile" class="mx-auto flex max-w-xl flex-col gap-8 text-center">
      <div>
        <HeaderText class="text-4xl">Welcome to Habit Tracker!</HeaderText>
        <p class="mt-4">
          It seems it's your first time. Create a profile now, or generate a default one and update it later.
        </p>
      </div>

      <div class="flex justify-center gap-8">
        <Button @click="showCreateProfile = true" class="px-4 py-2 border-2 border-card-border rounded-md">
          Create Profile
        </Button>

        <Button
          class="px-4 py-2 border-2 border-card-bg bg-card-bg rounded-md"
          :disabled="creatingDefault"
          @click="createDefaultProfile"
        >
          {{ creatingDefault ? "Creating..." : "Use Default Profile" }}
        </Button>
      </div>
    </div>
  </Section>
</template>