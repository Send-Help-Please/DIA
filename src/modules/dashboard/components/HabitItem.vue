<script setup lang="ts">
import { Trash } from '@lucide/vue';
import { useModal } from '@/composables/useModal.ts';
import Button from '@/components/Button.vue';
import { Habit } from '@/types/Habit.ts';
import HabitForm from './HabitForm.vue';

const props = defineProps<{
    habit: Habit;
    editing: boolean;
    validateTitle: (id: string, title: string) => string;
}>();

const emit = defineEmits<{
    startEdit: [];
    cancelEdit: [];
    updateHabit: [habit: Habit];
    deleteHabit: [habit: Habit];
}>();

const { confirm } = useModal();

function validateEditTitle(title: string): string {
    return props.validateTitle(props.habit.id, title);
}

function saveEdit(payload: { title: string; icon: string }) {
    emit('updateHabit', {
        ...props.habit,
        ...payload,
    });

    emit('cancelEdit');
}

async function deleteHabit() {
    const ok = await confirm({
        title: 'Delete Habit',
        message:
            'Are you sure you want to delete this habit? This action cannot be reversed',
        confirmButton: {
            text: 'Delete',
            danger: true,
        },
    });

    if (ok) emit('deleteHabit', props.habit);
}
</script>

<template>
    <li class="my-4">
        <HabitForm
            v-if="editing"
            submit-text="Save"
            :title="habit.title"
            :icon="habit.icon"
            :validate="validateEditTitle"
            @submit="saveEdit"
            @cancel="emit('cancelEdit')"
        />

        <div v-else class="flex justify-between items-center">
            <Button @click="emit('startEdit')">{{ habit.title }}</Button>

            <Button @click="deleteHabit">
                <Trash :size="20" class="text-error" />
            </Button>
        </div>
    </li>
</template>
