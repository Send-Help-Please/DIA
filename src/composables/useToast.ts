import { readonly, ref } from 'vue';

export type ToastType = 'info' | 'success' | 'error';

export type Toast = {
    id: string;
    message: string;
    type: ToastType;
    duration: number;
    createdAt: number;
    remaining: number;
    timer?: ReturnType<typeof setTimeout>;
    startedAt?: number;
};

const toasts = ref<Toast[]>([]);

function removeToast(id: string) {
    const toast = toasts.value.find((toast) => toast.id === id);
    if (toast?.timer) clearTimeout(toast.timer);

    toasts.value = toasts.value.filter((toast) => toast.id !== id);
}

function startTimer(toast: Toast) {
    toast.startedAt = Date.now();

    toast.timer = setTimeout(() => {
        removeToast(toast.id);
    }, toast.remaining);
}

function pauseToast(id: string) {
    const toast = toasts.value.find((toast) => toast.id === id);
    if (!toast || !toast.timer || !toast.startedAt) return;

    clearTimeout(toast.timer);
    toast.timer = undefined;

    const elapsed = Date.now() - toast.startedAt;
    toast.remaining = Math.max(0, toast.remaining - elapsed);
}

function resumeToast(id: string) {
    const toast = toasts.value.find((toast) => toast.id === id);
    if (!toast || toast.timer) return;

    startTimer(toast);
}

function showToast(
    message: string,
    type: ToastType = 'info',
    duration = 4000,
) {
    const toast: Toast = {
        id: crypto.randomUUID(),
        message,
        type,
        duration,
        createdAt: Date.now(),
        remaining: duration,
    };

    toasts.value = [toast, ...toasts.value];

    startTimer(toast);

    return toast.id;
}

export function useToast() {
    return {
        toasts: readonly(toasts),
        showToast,
        removeToast,
        pauseToast,
        resumeToast,

        info: (message: string, duration?: number) =>
            showToast(message, 'info', duration),

        success: (message: string, duration?: number) =>
            showToast(message, 'success', duration),

        error: (message: string, duration?: number) =>
            showToast(message, 'error', duration),
    };
}