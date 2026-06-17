<script setup lang="ts">
import BaseModal from './BaseModal.vue';
import Button from './Button.vue';

defineProps<{
    open: boolean;
    title: string;
    message?: string;
    confirmButton?: {
        text?: string;
        danger?: boolean;
    };
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
    <BaseModal :open="open" :title="title" @close="emit('cancel')">
        <p v-if="message" class="text-md">
            {{ message }}
        </p>

        <template #footer>
            <Button
                class="rounded-md border px-4 py-2 text-sm"
                @click="emit('cancel')"
            >
                {{ cancelButton?.text ?? 'Cancel' }}
            </Button>

            <Button
                class="rounded-md border px-4 py-2 text-sm"
                :class="
                    confirmButton?.danger
                        ? 'bg-error text-header border-error'
                        : ''
                "
                @click="emit('confirm')"
            >
                {{ confirmButton?.text ?? 'Confirm' }}
            </Button>
        </template>
    </BaseModal>
</template>
