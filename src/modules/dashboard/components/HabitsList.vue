<script setup lang="ts">
import { computed, ref } from 'vue';
import { Habit } from '../../../stores/useHabitsStore';
import HabitItem from './HabitItem.vue';

const props = defineProps<{ habits: Habit[] }>();

const emit = defineEmits<{
  updateHabit: [habit: Habit];
  deleteHabit: [habit: Habit];
}>();

const editingHabitId = ref<string | null>(null);

const habitTitles = computed(() =>
  props.habits.map(h => ({
    id: h.id,
    title: h.title.trim().toLowerCase(),
  }))
);

function validateTitle(id: string, title: string) {
  const value = title.trim();

  if (!value) return 'Title is required.';
  if (value.length < 2) return 'Title must be at least 2 characters.';
  if (value.length > 50) return 'Title must be 50 characters or less.';

  const duplicate = habitTitles.value.some(
    h => h.id !== id && h.title === value.toLowerCase()
  );

  if (duplicate) return 'Habit title already exists.';

  return '';
}
</script>

<template>
  <ul class="list-disc ml-12">
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
</template>