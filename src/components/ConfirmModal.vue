<script setup lang="ts">
import BaseModal from './BaseModal.vue';

defineProps<{
  open: boolean;
  title: string;
  message?: string;
  confirmButton?: {
    text?: string;
    danger?: boolean;
  }
  cancelButton?: {
    text?: string;
    danger?: boolean;
  };
}>();

const emit = defineEmits<{
  confirm: [];
  cancel: [];
}>();
</script>

<template>
  <BaseModal
    :open="open"
    :title="title"
    @close="emit('cancel')"
  >
    <p v-if="message" class="text-sm opacity-80">
      {{ message }}
    </p>

    <template #footer>
      <button
        type="button"
        class="rounded-md border px-3 py-2 text-sm cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
        @click="emit('cancel')"
      >
        {{ cancelButton?.text ?? 'Cancel' }}
      </button>

      <button
        type="button"
        class="rounded-md border px-3 py-2 text-sm cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
        :class="confirmButton?.danger ? 'bg-red-900 text-white border-red-900' : ''"
        @click="emit('confirm')"
      >
        {{ confirmButton?.text ?? 'Confirm' }}
      </button>
    </template>
  </BaseModal>
</template>