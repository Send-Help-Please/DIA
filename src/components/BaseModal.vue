<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { X } from '@lucide/vue';
import Button from './Button.vue';
import HeaderText from '@/modules/dashboard/components/HeaderText.vue';

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
            class="fixed inset-0 z-50 flex items-center justify-center p-4 text-text"
        >
            <div
                class="absolute inset-0 bg-black/30 backdrop-blur-sm"
                @click="emit('close')"
            />

            <section
                class="relative z-10 w-full max-w-md rounded-xl border bg-card-bg p-6 shadow-2xl"
                role="dialog"
                aria-modal="true"
            >
                <header class="mb-4 flex items-center justify-between gap-4">
                    <HeaderText class="text-lg font-semibold">
                        {{ title }}
                    </HeaderText>

                    <Button
                        class="rounded-md p-1 text-header"
                        @click="emit('close')"
                    >
                        <X />
                    </Button>
                </header>

                <slot />

                <footer
                    v-if="$slots.footer"
                    class="mt-5 flex justify-end gap-2"
                >
                    <slot name="footer" />
                </footer>
            </section>
        </div>
    </Teleport>
</template>
