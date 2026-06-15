<script setup lang="ts">
import { computed, ref } from 'vue';
import BaseModal from './BaseModal.vue';
import { searchIcons } from '../utils/lucideIconMap.ts';

defineProps<{
  open: boolean;
  selectedIcon?: string;
}>();

const emit = defineEmits<{
  select: [iconName: string];
  close: [];
}>();

const search = ref('');
const MAX_ICONS = 40;

const icons = computed(() => {
  return searchIcons(search.value).slice(0, MAX_ICONS);
});
</script>

<template>
  <BaseModal
    :open="open"
    title="Select icon"
    @close="emit('close')"
  >
    <input
      v-model="search"
      placeholder="Search by name or tag..."
      class="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2"
      autofocus
    />

    <div
      v-if="icons.length"
      class="mt-4 grid grid-cols-10 grid-rows-4 gap-2"
    >
      <button
        v-for="icon in icons"
        :key="icon.name"
        type="button"
        class="flex aspect-square items-center justify-center rounded-md border transition hover:scale-105 cursor-pointer"
        :class="{ 'ring-2': selectedIcon === icon.name }"
        :title="`${icon.label} — ${icon.tags.join(', ')}`"
        @click="emit('select', icon.name)"
      >
        <component :is="icon.component" :size="22" />
      </button>
    </div>

    <p v-else class="mt-4 text-sm opacity-70">
      No icons found.
    </p>
  </BaseModal>
</template>