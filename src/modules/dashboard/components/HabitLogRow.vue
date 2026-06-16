<script setup lang="ts">
import { Habit, Log } from '../../../stores/useHabitsStore';
import {
  getFormattedDate,
  getLogForDate,
  hasLogForDate,
} from '../composables/useHabitTable';

import HabitProgressBar from './HabitProgressBar.vue';
import HabitCheckCell from './HabitCheckCell.vue';
import HabitToggleAllCell from './HabitToggleAllCell.vue';

const props = defineProps<{
  date: Date;
  habits: Habit[]; 
  progress: number;
  today: Date;
}>();

const emit = defineEmits<{
  toggle: [Date, string];
  untoggle: [Log];
  toggleAll: [Date, string[]];
  untoggleAll: [Log[]];
  selectDay: [Date]
}>();

function toggleHabit(habit: Habit) {
  const log = getLogForDate(habit, props.date);

  if (log) {
    emit('untoggle', log);
    return;
  }

  emit('toggle', props.date, habit.id);
}

function getLogsForDate(): Log[] {
  return props.habits
    .map(habit => getLogForDate(habit, props.date))
    .filter((log): log is Log => !!log);
}

function isEveryHabitDone(): boolean {
  return props.habits.length > 0 &&
    props.habits.every(habit => hasLogForDate(habit, props.date));
}

function isToday(): boolean {
  return getFormattedDate(props.today) === getFormattedDate(props.date);
}

function toggleAll() {
  if (isEveryHabitDone()) {
    emit('untoggleAll', getLogsForDate());
    return;
  }

  const missingHabitIds = props.habits
    .filter(habit => !hasLogForDate(habit, props.date))
    .map(habit => habit.id);

  emit('toggleAll', props.date, missingHabitIds);
}
</script>

<template>
  <tr class="border-y border-mist-700">
    <td class="border-r border-mist-700 px-4 py-2" :class="isToday() ? 'bg-mist-400 text-mist-900 border-mist-400' : ''">
      <button @click="emit('selectDay', date)" class="cursor-pointer opacity-70 hover:opacity-100">{{ getFormattedDate(date) }}</button>
    </td>

    <td class="border-r border-mist-700 px-4 py-2">
      <HabitProgressBar :progress="progress" />
    </td>

    <HabitCheckCell
      v-for="habit in habits"
      :key="habit.id"
      :checked="hasLogForDate(habit, date)"
      @toggle="toggleHabit(habit)"
    />

    <HabitToggleAllCell
      :checked="isEveryHabitDone()"
      @toggle="toggleAll"
    />
  </tr>
</template>