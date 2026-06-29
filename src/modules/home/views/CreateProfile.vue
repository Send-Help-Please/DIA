<script setup lang="ts">
import { computed, ref } from "vue";
import Section from "@/components/Section.vue";
import Button from "@/components/Button.vue";
import { profileService } from "@/services/profileService";

import { open } from "@tauri-apps/plugin-dialog";
import { convertFileSrc } from "@tauri-apps/api/core";
import { invoke } from "@tauri-apps/api/core";
import TextInput from "@/components/TextInput.vue";
import SelectInput from "@/components/SelectInput.vue";
import ImageInput from "@/components/ImageInput.vue";
import { validateDisplayName } from "../validations/displayNameValidation";
import { validateWeekStartsOn } from "../validations/weekStartsOnValidation";
import { Profile } from "@/types/Profile";

const props = defineProps<{ 
  goToDashboard: () => Promise<void>,
  setProfile: (profile: Profile) => void;
}>();

const displayName = ref("");
const weekStartsOn = ref("1");

const tempAvatarPath = ref<string | null>(null);
const avatarPreviewUrl = ref<string | null>(null);
const isUploadingAvatar = ref(false);

const errors = computed(() => ({
  displayName: validateDisplayName(displayName.value),
  weekStartsOn: validateWeekStartsOn(weekStartsOn.value)
}));

const isValid = computed(() =>
  !errors.value.displayName && !errors.value.weekStartsOn
);

async function chooseAvatar() {
  const selected = await open({
    multiple: false,
    filters: [{ name: "Image", extensions: ["png", "jpg", "jpeg", "webp"] }],
  });

  if (typeof selected !== "string") return;

  isUploadingAvatar.value = true;

  try {
    const savedPath = await invoke<string>("save_temp_avatar", {
      sourcePath: selected,
    });

    tempAvatarPath.value = savedPath;
    avatarPreviewUrl.value = convertFileSrc(savedPath);
  } catch (err) {
    console.error("Failed to save temp avatar:", err);
  } finally {
    isUploadingAvatar.value = false;
  }
}

async function createProfile() {
  if (!isValid.value) return;

  try {
    const profile = await profileService.createProfile({
      displayName: displayName.value,
      avatarUrl: tempAvatarPath.value ?? "",
      weekStartsOn: Number.parseInt(weekStartsOn.value),
    });

    props.setProfile(profile);

    await props.goToDashboard();
  } catch (err) {
    console.error(err);
  }
}
</script>

<template>
  <Section class="text-text">
    <form class="mx-auto flex w-full max-w-md flex-col gap-4" @submit.prevent="createProfile">
      <div class="text-center">
        <h1 class="text-2xl font-semibold">Create your profile</h1>
        <p class="mt-2 text-sm">
          Customize your habit tracker before getting started.
        </p>
      </div>

      <ImageInput 
        :handle-select-image="chooseAvatar"
        :preview-url="avatarPreviewUrl"
        :is-loading="isUploadingAvatar"
        button-text="Select avatar"
      />

      <TextInput 
        v-model:value="displayName"
        v-model:error="errors.displayName"
        label="Display Name"
        placeholder="Enter your display name..."
      />

      <SelectInput 
        v-model:value="weekStartsOn"
        v-model:error="errors.weekStartsOn"
        :options="[ { label: 'Sunday', value: '0' }, { label: 'Monday', value: '1' }, { label: 'Tuesday', value: '2' } ]"
      />

      <Button 
        type="submit" 
        :disabled="!isValid || isUploadingAvatar" 
        class="border-card-border rounded-md border py-2 px-4"
      >
        Create profile
      </Button>
    </form>
  </Section>
</template>