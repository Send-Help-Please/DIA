<script setup lang="ts">
defineProps<{
    handleSelectImage: () => void,
    previewUrl?: string | null,
    isLoading: boolean,
    buttonText?: string,
}>();

</script>

<template>
    <div class="flex flex-col items-center gap-3">
        <label class="flex flex-col items-center gap-3 cursor-pointer" @click.prevent="handleSelectImage">
          <div class="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border border-dashed border-neutral-300 bg-neutral-100 text-neutral-400">
            <img
              v-if="previewUrl"
              :src="previewUrl"
              class="h-full w-full object-cover"
              alt="Avatar preview"
            />
            <span v-else-if="isLoading" class="text-xs">Loading...</span>
            <span v-else class="text-sm">No Image</span>
          </div>

          <span class="cursor-pointer rounded-lg border px-4 py-2 text-sm hover:bg-neutral-50">
            {{ buttonText ?? "Select image" }}
          </span>
        </label>
      </div>
</template>