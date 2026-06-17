<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { X } from '@lucide/vue';
import Button from '@/components/Button.vue';
import ErrorText from '../components/ErrorText.vue';
import { useModal } from '@/composables/useModal';
import { useIconComponent } from '../composables/useIconComponent';

const props = withDefaults(
    defineProps<{
        title?: string;
        icon?: string;
        submitText?: string;
        validate?: (title: string) => string;
    }>(),
    {
        title: '',
        icon: '',
        submitText: 'Save',
        validate: () => '',
    },
);

const emit = defineEmits<{
    submit: [payload: { title: string; icon: string }];
    cancel: [];
}>();

const draftTitle = ref('');
const draftIcon = ref('');

const { pickIcon } = useModal();

const error = computed(() => props.validate(draftTitle.value));

const currentIcon = computed(
    () => useIconComponent(draftIcon.value || props.icon).component,
);

watch(
    () => [props.title, props.icon],
    () => {
        draftTitle.value = props.title;
        draftIcon.value = props.icon;
    },
    { immediate: true },
);

async function changeIcon() {
    const icon = await pickIcon(draftIcon.value || props.icon);
    if (icon) draftIcon.value = icon;
}

function submit() {
    if (error.value) return;

    emit('submit', {
        title: draftTitle.value.trim(),
        icon: draftIcon.value || props.icon,
    });
}
</script>

<template>
    <div class="flex flex-col gap-1">
        <div class="flex flex-col gap-4">
            <input
                v-model="draftTitle"
                class="border rounded px-2 py-1"
                autofocus
                @keyup.enter="submit"
                @keyup.esc="emit('cancel')"
            />

            <ErrorText v-if="error">{{ error }}</ErrorText>

            <div class="flex gap-4 items-center justify-between">
                <div class="flex gap-4 items-center">
                    <Button
                        class="text-header font-bold disabled:opacity-50"
                        :disabled="!!error"
                        @click="submit"
                    >
                        {{ submitText }}
                    </Button>

                    <Button
                        class="text-error font-bold"
                        @click="emit('cancel')"
                    >
                        <X />
                    </Button>
                </div>

                <Button @click="changeIcon">
                    <component :is="currentIcon" :size="20" />
                </Button>
            </div>
        </div>
    </div>
</template>
