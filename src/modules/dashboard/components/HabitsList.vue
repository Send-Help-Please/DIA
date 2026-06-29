<script setup lang="ts">
import { ref } from 'vue';
import HabitItem from './HabitItem.vue';
import { Habit } from '@/types/Habit.ts';
import { validateHabitTitle } from '../validations/habitTitleValidation.ts';

const props = defineProps<{ habits: Habit[] }>();

const emit = defineEmits<{
    updateHabit: [habit: Habit];
    deleteHabit: [habit: Habit];
}>();

const editingHabitId = ref<string | null>(null);

function validateTitle(id: string, title: string) {
    return validateHabitTitle(id, title, props.habits);
}
</script>

<template>
    <ul v-if="habits.length > 0" class="list-disc ml-12">
        <HabitItem
            v-for="habit in habits"
            :key="habit.id"
            :habit="habit"
            :editing="editingHabitId === habit.id"
            :validate-title="validateTitle"
            @start-edit="editingHabitId = habit.id"
            @cancel-edit="editingHabitId = null"
            @update-habit="emit('updateHabit', $event)"
            @delete-habit="emit('deleteHabit', $event)"
        />
    </ul>
    <p class="opacity-70" v-else>Click '+' to create one.</p>
</template>
