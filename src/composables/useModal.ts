import { readonly, ref } from 'vue';

type ConfirmPayload = {
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
};

type ModalState =
    | { type: null }
    | {
          type: 'confirm';
          payload: ConfirmPayload;
          resolve: (value: boolean) => void;
      }
    | {
          type: 'icon-picker';
          selectedIcon?: string;
          resolve: (value: string | null) => void;
      };

const modal = ref<ModalState>({ type: null });

function closeModal() {
    if (modal.value.type === 'confirm') {
        modal.value.resolve(false);
    }

    if (modal.value.type === 'icon-picker') {
        modal.value.resolve(null);
    }

    modal.value = { type: null };
}

function confirm(payload: ConfirmPayload): Promise<boolean> {
    return new Promise((resolve) => {
        modal.value = {
            type: 'confirm',
            payload,
            resolve,
        };
    });
}

function resolveConfirm(value: boolean) {
    if (modal.value.type !== 'confirm') return;

    modal.value.resolve(value);
    modal.value = { type: null };
}

function pickIcon(selectedIcon?: string): Promise<string | null> {
    return new Promise((resolve) => {
        modal.value = {
            type: 'icon-picker',
            selectedIcon,
            resolve,
        };
    });
}

function resolveIcon(iconName: string) {
    if (modal.value.type !== 'icon-picker') return;

    modal.value.resolve(iconName);
    modal.value = { type: null };
}

export function useModal() {
    return {
        modal: readonly(modal),
        closeModal,
        confirm,
        resolveConfirm,
        pickIcon,
        resolveIcon,
    };
}
