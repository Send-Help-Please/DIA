<script setup lang="ts">
import { Calendar, CircleDashed, ListChecks } from '@lucide/vue';
import { toRef } from 'vue';
import { useIconComponent } from '../composables/useIconComponent';
import { useHabitLogTable } from '../composables/useHabitTable';

import HabitLogRow from './HabitLogRow.vue';
import HabitTableHeader from './HabitTableHeader.vue';
import { Habit } from '@/types/Habit.ts';
import { Log } from '@/types/Log.ts';
import { dateToKey } from '../utils/dateUtils.ts';

const props = defineProps<{
    habits: Habit[];
    currentDate: Date;
    type: 'week' | 'month';
    today: Date;
}>();

const emit = defineEmits<{
    toggle: [Date, string];
    untoggle: [Log];
    toggleAll: [Date, string[]];
    untoggleAll: [Log[]];
    selectDay: [Date];
}>();

const { dates, averages, progresses } = useHabitLogTable(
    toRef(props, 'habits'),
    toRef(props, 'currentDate'),
    toRef(props, 'type'),
);

function emitToggle(date: Date, habitId: string) {
    emit('toggle', date, habitId);
}

function emitUntoggle(log: Log) {
    emit('untoggle', log);
}

function emitToggleAll(date: Date, habitIds: string[]) {
    emit('toggleAll', date, habitIds);
}

function emitUntoggleAll(logs: Log[]) {
    emit('untoggleAll', logs);
}

function emitSelectDay(date: Date) {
    emit('selectDay', date);
}
</script>

<template>
    <table class="text-text">
        <thead>
            <tr>
                <HabitTableHeader type="withIcon">
                    <Calendar :size="20" /> Date
                </HabitTableHeader>

                <HabitTableHeader type="withIcon">
                    <CircleDashed :size="20" /> Progress Bar
                </HabitTableHeader>

                <HabitTableHeader
                    v-for="habit in habits"
                    :key="habit.id"
                    :title="habit.title"
                    type="iconOnly"
                >
                    <component
                        :is="useIconComponent(habit.icon).component"
                        :size="20"
                    />
                </HabitTableHeader>

                <HabitTableHeader type="iconOnly">
                    <ListChecks :size="20" />
                </HabitTableHeader>
            </tr>
        </thead>

        <tbody>
            <HabitLogRow
                v-for="date in dates"
                :key="dateToKey(date)"
                :date="date"
                :habits="habits"
                :progress="progresses[dateToKey(date)]"
                :today="today"
                @toggle="emitToggle"
                @untoggle="emitUntoggle"
                @toggle-all="emitToggleAll"
                @untoggle-all="emitUntoggleAll"
                @select-day="emitSelectDay"
            />

            <tr>
                <td></td>
                <td class="text-right text-sm font-bold p-2">Average</td>

                <td
                    v-for="habit in habits"
                    :key="habit.id"
                    class="text-center p-2"
                >
                    {{ averages[habit.id] }}
                </td>
            </tr>
        </tbody>
    </table>
</template>
