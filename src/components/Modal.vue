<script setup lang="ts">
import { useModal } from '@/composables/useModal.ts';
import ConfirmModal from './ConfirmModal.vue';
import IconPickerModal from './IconPickerModal.vue';

const { modal, closeModal, resolveConfirm, resolveIcon } = useModal();
</script>

<template>
    <ConfirmModal
        v-if="modal.type === 'confirm'"
        open
        :title="modal.payload.title"
        :message="modal.payload.message"
        :confirm-button="modal.payload.confirmButton"
        :cancel-button="modal.payload.cancelButton"
        @confirm="resolveConfirm(true)"
        @cancel="resolveConfirm(false)"
    />

    <IconPickerModal
        v-if="modal.type === 'icon-picker'"
        open
        :selected-icon="modal.selectedIcon"
        @select="resolveIcon"
        @close="closeModal"
    />
</template>
