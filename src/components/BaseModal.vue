<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { X } from '@lucide/vue';

defineProps<{
  open: boolean;
  title?: string;
}>();

const emit = defineEmits<{
  close: [];
}>();

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') emit('close');
}

onMounted(() => window.addEventListener('keydown', onKeydown));
onUnmounted(() => window.removeEventListener('keydown', onKeydown));
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 text-mist-400"
    >
      <div
        class="absolute inset-0 bg-black/30 backdrop-blur-sm"
        @click="emit('close')"
      />

      <section
        class="relative z-10 w-full max-w-md rounded-xl border bg-mist-800 p-6 shadow-2xl"
        role="dialog"
        aria-modal="true"
      >
        <header class="mb-4 flex items-center justify-between gap-4">
          <h2 class="text-lg font-semibold">
            {{ title }}
          </h2>

          <button
            type="button"
            class="rounded-md p-1 opacity-70 transition-opacity hover:opacity-100 cursor-pointer"
            @click="emit('close')"
          >
            <X />
          </button>
        </header>

        <slot />

        <footer v-if="$slots.footer" class="mt-5 flex justify-end gap-2">
          <slot name="footer" />
        </footer>
      </section>
    </div>
  </Teleport>
</template>