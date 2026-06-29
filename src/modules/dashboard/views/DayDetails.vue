<script setup lang="ts">
import HabitProgressBar from '../components/HabitProgressBar.vue';
import { useIconComponent } from '../composables/useIconComponent.ts';
import HeaderText from '@/components/HeaderText.vue';
import { Habit } from '@/types/Habit.ts';
import { getFormattedDate, getWeekDay } from '../utils/dateUtils.ts';
import { getProgressForDate } from '../utils/statUtils.ts';
import HabitCheckCell from '../components/HabitCheckCell.vue';
import { getLogForDate, hasLogForDate } from '../utils/logUtils.ts';
import { Log } from '@/types/Log.ts';
import { Note } from '@/types/Note.ts';
import { useDateNote } from '../composables/useDateNote.ts';

const props = defineProps<{
    day: Date;
    habits: Habit[];
    logs: Log[];
    note?: Note;
    addLog: (log: Omit<Log, "id">) => Promise<void>;
    removeLog: (log: Log) => Promise<void>;
}>();

defineEmits<{
    close: [];
}>();

const { draftNote } = useDateNote(() => props.day);

async function toggleHabit(habit: Habit) {
    const log = getLogForDate(habit, props.logs, props.day);

    if (log) {
        props.removeLog(log);
        return;
    }

    await props.addLog({ habitId: habit.id, logDate: props.day });
}
</script>

<template>
    <div class="bg-card-bg border border-card-border rounded-md p-16 w-96">
        <div class="mb-6">
            <HeaderText>
                {{ getFormattedDate(day) }}
            </HeaderText>

            <p class="mt-1">
                {{ getWeekDay(day) }}
            </p>
        </div>

        <div class="mb-6">
            <p class="text-sm mb-2">Progress</p>

            <HabitProgressBar :progress="getProgressForDate(day, habits, logs)" />
        </div>

        <div class="mb-6">
            <p class="text-sm mb-3">Habits</p>

            <div class="flex flex-col gap-3">
                <label
                    v-for="habit in habits"
                    :key="habit.id"
                    class="flex items-center justify-between text-sm"
                >
                    <span class="flex items-center gap-2"
                        ><component
                            :is="useIconComponent(habit.icon).component"
                        />
                        {{ habit.title }}</span
                    >

                    <HabitCheckCell
                        :checked="hasLogForDate(habit, logs, day)"
                        @toggle="toggleHabit(habit)"
                    />
                </label>
            </div>
        </div>

        <hr />

        <div>
            <textarea
                v-model="draftNote"
                placeholder="Add your notes here"
                class="w-full resize-none mt-4 bg-transparent text-sm text-header placeholder:text-text outline-none min-h-24"
            />
        </div>
    </div>
</template>
