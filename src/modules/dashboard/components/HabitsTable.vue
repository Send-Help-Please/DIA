<script setup lang="ts">
import { Calendar, CircleDashed, ListChecks } from '@lucide/vue';
import { toRef } from 'vue';
import { Habit, Log } from '../../../stores/useHabitsStore';
import { useIconComponent } from '../composables/useIconComponent';
import {
  toDateKey,
  useHabitLogTable,
} from '../composables/useHabitTable';

import HabitLogRow from './HabitLogRow.vue';
import HabitTableHeader from './HabitTableHeader.vue';

const props = defineProps<{
  habits: Habit[];
  currentDate: Date;
  type: 'week' | 'month';
}>();

const emit = defineEmits<{
  toggle: [Date, string];
  untoggle: [Log];
  toggleAll: [Date, string[]];
  untoggleAll: [Log[]];
}>();

const { dates, averages, progresses } = useHabitLogTable(
  toRef(props, 'habits'),
  toRef(props, 'currentDate'),
  toRef(props, 'type')
);

function emitToggle(date: Date, habitId: string) {
  emit('toggle', date, habitId);
}

function emitUntoggle(log: Log) {
  emit("untoggle", log)
}

function emitToggleAll(date: Date, habitIds: string[]) {
  emit('toggleAll', date, habitIds);
}

function emitUntoggleAll(logs: Log[]) {
  emit('untoggleAll', logs)
}
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>
          <HabitTableHeader class="flex items-center gap-2">
            <Calendar :size="20" /> Date
          </HabitTableHeader>
        </th>

        <th>
          <HabitTableHeader class="flex items-center gap-2">
            <CircleDashed :size="20" /> Progress Bar
          </HabitTableHeader>
        </th>

        <th
          v-for="habit in habits"
          :key="habit.id"
          class="p-2 px-4 text-mist-400 font-normal"
        >
          <div class="flex items-center justify-center" :title="habit.title">
            <component :is="useIconComponent(habit.icon).component" :size="20" />
          </div>
        </th>

        <th class="p-2 px-4 text-mist-400 font-normal">
          <div class="flex items-center justify-center">
            <ListChecks :size="20" />
          </div>
        </th>
      </tr>
    </thead>

    <tbody>
      <HabitLogRow
        v-for="date in dates"
        :key="toDateKey(date)"
        :date="date"
        :habits="habits"
        :progress="progresses[toDateKey(date)]"
        @toggle="emitToggle"
        @untoggle="emitUntoggle"
        @toggle-all="emitToggleAll"
        @untoggle-all="emitUntoggleAll"
      />

      <tr>
        <td></td>
        <td class="text-mist-400 text-right text-sm font-bold p-2">
          Average
        </td>

        <td
          v-for="habit in habits"
          :key="habit.id"
          class="text-mist-400 text-center p-2"
        >
          {{ averages[habit.id] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>