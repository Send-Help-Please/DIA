<script setup lang="ts">
import { computed } from 'vue';
import { Toast, useToast } from '@/composables/useToast';

const { toasts, removeToast, pauseToast, resumeToast } = useToast();

function toastClass(toast: Toast) {
    return `toast toast--${toast.type}`;
}

function progressStyle(toast: Toast) {
    return {
        animationDuration: `${toast.remaining}ms`,
    };
}

function iconFor(type: Toast['type']) {
    if (type === 'success') return '✓';
    if (type === 'error') return '!';
    return 'i';
}

const hasToasts = computed(() => toasts.value.length > 0);
</script>

<template>
    <Teleport to="body">
        <div v-if="hasToasts" class="toast-stack" aria-live="polite">
            <TransitionGroup name="toast-list">
                <div
                    v-for="toast in toasts"
                    :key="toast.id"
                    :class="toastClass(toast)"
                    role="status"
                    @mouseenter="pauseToast(toast.id)"
                    @mouseleave="resumeToast(toast.id)"
                >
                    <div class="toast__content">
                        <span class="toast__icon">
                            {{ iconFor(toast.type) }}
                        </span>

                        <p class="toast__message">
                            {{ toast.message }}
                        </p>

                        <button
                            class="toast__close"
                            type="button"
                            aria-label="Close toast"
                            @click="removeToast(toast.id)"
                        >
                            ×
                        </button>
                    </div>

                    <div class="toast__timer">
                        <div
                            :key="`${toast.id}-${toast.remaining}`"
                            class="toast__timer-fill"
                            :style="progressStyle(toast)"
                        />
                    </div>
                </div>
            </TransitionGroup>
        </div>
    </Teleport>
</template>

<style scoped>
.toast-stack {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    width: min(24rem, calc(100vw - 2rem));
    pointer-events: none;
}

.toast {
    --toast-accent: currentColor;

    overflow: hidden;
    border: 1px solid var(--toast-accent);
    border-radius: 0.75rem;
    background: var(--color-card-bg, Canvas);
    color: var(--color-text, CanvasText);
    box-shadow: var(--shadow-lg, 0 1rem 2rem rgb(0 0 0 / 0.14));
    pointer-events: auto;
}

.toast--info {
    --toast-accent: var(--color-info, currentColor);
}

.toast--success {
    --toast-accent: var(--color-success, currentColor);
}

.toast--error {
    --toast-accent: var(--color-error, currentColor);
}

.toast__content {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: start;
    gap: 0.75rem;
    padding: 0.875rem 1rem;
}

.toast__icon {
    display: grid;
    place-items: center;
    width: 1.5rem;
    height: 1.5rem;
    border: 1px solid var(--toast-accent);
    border-radius: 999px;
    color: var(--toast-accent);
    font-size: 0.8rem;
    font-weight: 700;
}

.toast__message {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.4;
}

.toast__close {
    border: 0;
    background: transparent;
    color: inherit;
    cursor: pointer;
    font-size: 1.25rem;
    line-height: 1;
    opacity: 0.65;
}

.toast__close:hover {
    opacity: 1;
}

.toast__timer {
    height: 3px;
    background: color-mix(in srgb, var(--toast-accent), transparent 80%);
}

.toast__timer-fill {
    height: 100%;
    width: 100%;
    background: var(--toast-accent);
    transform-origin: left;
    animation: toast-progress linear forwards;
}

.toast:hover .toast__timer-fill {
    animation-play-state: paused;
}

@keyframes toast-progress {
    from {
        transform: scaleX(1);
    }

    to {
        transform: scaleX(0);
    }
}

.toast-list-enter-active,
.toast-list-leave-active {
    transition:
        opacity 0.2s ease,
        transform 0.2s ease;
}

.toast-list-enter-from,
.toast-list-leave-to {
    opacity: 0;
    transform: translateX(1rem);
}
</style>