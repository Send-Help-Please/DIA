<script setup lang="ts">
import HabitProgressBar from './HabitProgressBar.vue';
import HabitCheckCell from './HabitCheckCell.vue';
import Button from '@/components/Button.vue';
import { Habit } from '@/types/Habit.ts';
import { Log } from '@/types/Log.ts';
import {
    getLogForDate,
    getLogsForDate,
    hasLogForDate,
} from '../utils/logUtils.ts';
import { datesAreSame, getFormattedDate } from '../utils/dateUtils.ts';
import { isEveryHabitDoneForDate } from '../utils/habitUtils.ts';
import { computed } from 'vue';

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
    selectDay: [Date];
}>();

const everyHabitIsDoneForDate = computed(() => {
    return isEveryHabitDoneForDate(props.habits, props.date);
});

const isToday = computed(() => {
    return datesAreSame(props.today, props.date);
});

function toggleHabit(habit: Habit) {
    const log = getLogForDate(habit, props.date);

    if (log) {
        emit('untoggle', log);
        return;
    }

    emit('toggle', props.date, habit.id);
}

function toggleAll() {
    if (everyHabitIsDoneForDate.value) {
        emit('untoggleAll', getLogsForDate(props.habits, props.date));
        return;
    }

    const missingHabitIds = props.habits
        .filter((habit) => !hasLogForDate(habit, props.date))
        .map((habit) => habit.id);

    emit('toggleAll', props.date, missingHabitIds);
}
</script>

<template>
    <tr class="border-y border-card-border">
        <td
            class="border-r border-card-border px-4 py-2"
            :class="isToday ? 'bg-text text-bg border-text' : ''"
        >
            <Button @click="emit('selectDay', date)">{{
                getFormattedDate(date)
            }}</Button>
        </td>

        <td class="border-r border-card-border px-4 py-2">
            <HabitProgressBar :progress="progress" />
        </td>

        <td
            v-for="habit in habits"
            :key="habit.id"
            class="border-r border-card-border p-2"
        >
            <HabitCheckCell
                :checked="hasLogForDate(habit, date)"
                @toggle="toggleHabit(habit)"
            />
        </td>

        <td class="border-r border-card-border p-2">
            <HabitCheckCell
                :checked="everyHabitIsDoneForDate"
                @toggle="toggleAll"
            />
        </td>
    </tr>
</template>
