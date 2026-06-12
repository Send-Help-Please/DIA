<script setup lang="ts">
import { Calendar, CircleDashed, ListChecks, Square } from '@lucide/vue';
import { computed } from 'vue';
import { Habit } from '../../../stores/useHabitsStore';

const props = defineProps<{
  habits: Habit[];
  currentDate: Date;
  type: 'week' | 'month';
}>();

function toDateKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function getWeekDates(currentDate: Date): Date[] {
  const date = new Date(currentDate);

  const day = date.getDay(); // 0 = Sunday, 1 = Monday
  const diffToMonday = day === 0 ? -6 : 1 - day;

  const monday = new Date(date);
  monday.setDate(date.getDate() + diffToMonday);

  return Array.from({ length: 7 }, (_, index) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + index);
    return d;
  });
}

function getMonthDates(currentDate: Date): Date[] {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const lastDay = new Date(year, month + 1, 0).getDate();

  return Array.from({ length: lastDay }, (_, index) => {
    return new Date(year, month, index + 1);
  });
}

function getFormattedDate(date: Date): string {
    const year = date.getFullYear();
    const month = date.toLocaleString(undefined, { month: 'long' });
    const day = date.toLocaleString(undefined, { day: '2-digit' })

    return `${month} ${day}, ${year}`;
}

const dates = computed(() => {
  return props.type === 'week'
    ? getWeekDates(props.currentDate)
    : getMonthDates(props.currentDate);
});

const averages = computed(() => {
  const result: Record<string, number> = {};

  for (const habit of props.habits) {
    const doneCount = dates.value.filter(date =>
      habit.logs.some(log => datesAreSame(log.date, date))
    ).length;

    const average = doneCount / dates.value.length;

    result[habit.id] = Math.round(average * 100) / 100;
  }

  return result;
});

const progresses = computed(() => {
    const result: Record<string, number> = {};

    for(const date of dates.value) {
        let count = 0;
        for(const habit of props.habits) {
            if(habit.logs.some(log => datesAreSame(log.date, date))) { count++; }
        }

        const progress = count / props.habits.length;

        result[date.getTime()] = Math.round(progress * 100);
    }

    return result;
});

const TOTAL_CUBES = 10;

function getFilledCubes(progress: number): number {
  return Math.floor(progress / 10);
}

function hasLogForDate(habit: Habit, date: Date): boolean {
  const dateKey = toDateKey(date);

  return habit.logs.some((log) => {
    const logDate = typeof log.date === 'string'
      ? new Date(log.date)
      : log.date;

    return toDateKey(logDate) === dateKey;
  });
}

function datesAreSame(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() && 
    date1.getMonth() === date2.getMonth() && 
    date1.toLocaleString(undefined, { day: '2-digit' }) === date2.toLocaleString(undefined, { day: '2-digit' });
}
</script>

<template>
    <table>
        <thead>
            <tr>
                <th>
                    <div class="text-left text-md px-4 py-2 text-mist-400 font-normal flex items-center gap-2">
                        <Calendar :size="20" /> Date
                    </div>
                </th>
                <th>
                    <div class="text-left text-md px-4 py-2 text-mist-400 font-normal flex items-center gap-2">
                        <CircleDashed :size="20" /> Progress Bar
                    </div>
                </th>
                <th v-for="habit in habits" v-bind:key="habit.title" class="p-2 text-mist-400 font-normal">
                    <div class="flex items-center justify-center">
                        <component :is="habit.icon" :size="15" />
                    </div>
                </th>
                <th class="p-2 text-mist-400 font-normal">
                    <div class="flex items-center justify-center">
                        <ListChecks :size="15" />
                    </div>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="date in dates" v-bind:key="toDateKey(date)" class="border-y border-mist-700">
                <td class="border-r border-mist-700 px-4 py-2">{{ `${getFormattedDate(date)}` }}</td>
                <td class="border-r border-mist-700 px-4 py-2">
                    <div class="flex items-center gap-2">
                        <div class="flex items-center">
                            <Square
                                v-for="cube in TOTAL_CUBES"
                                :key="cube"
                                :size="20"
                                :fill="cube <= getFilledCubes(progresses[date.getTime()]) ? 'white' : 'transparent'"
                                :class="cube <= getFilledCubes(progresses[date.getTime()])
                                    ? 'text-white'
                                    : 'text-mist-500'"
                            />
                        </div>
                        {{ progresses[date.getTime()] }}%
                    </div>
                </td>
                <td v-for="habit in habits" v-bind:key="habit.title" class="border-r border-mist-700 p-2">
                    <div class="flex items-center justify-center">
                        <button class="cursor-pointer w-4 h-4 rounded-sm border border-mist-400 bg-none" :class="hasLogForDate(habit, date) ? 'bg-mist-400' : ''" />
                    </div>
                </td>
                <td>
                    <div class="flex items-center justify-center">
                        <button class="cursor-pointer w-4 h-4 rounded-sm border border-mist-400 bg-none" />
                    </div>
                </td>
            </tr>
            <tr>
                <td></td>
                <td class="text-mist-400 text-right text-sm font-bold p-2">Average</td>
                <td v-for="value, key in averages" v-bind:key="key" class="text-mist-400 text-center p-2">{{ value }}</td>
            </tr>
        </tbody>
    </table>
</template>