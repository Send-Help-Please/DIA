<script setup lang="ts">
import Section from '../../../components/Section.vue';

import { CalendarDays, ArrowDownUp, Search, ListFilter } from '@lucide/vue';
import HabitsTable from '../components/HabitsTable.vue';
import { Habit, Log } from '../../../stores/useHabitsStore.ts';
import { ref } from 'vue';

const props = defineProps<{ 
    habits: Habit[], 
    today: Date,
    addLog: (log: Omit<Log, 'id'>) => void,
    removeLog: (log: Log) => void,
}>();

const emit = defineEmits<{
    selectDay: [Date]
}>();

const type = ref<"week" | "month">("week");

function handleToggle(date: Date, habitId: string) {
    props.addLog({ date, habitId });
}

function handleUntoggle(log: Log) {
    props.removeLog(log);
}

function handleToggleAll(date: Date, habitIds: string[]) {
    for(const id of habitIds) {
        handleToggle(date, id);
    }
}

function handleUntoggleAll(logs: Log[]) {
    for(const log of logs) {
        handleUntoggle(log);
    }
}

function emitSelectDay(date: Date) {
    emit('selectDay', date);
}
</script>

<template>
    <Section class="bg-mist-800 text-white p-8 px-6 rounded-md min-w-xl overflow-x-auto">
        <div class="mb-4 flex items-center gap-3">
            <div class="flex items-center gap-2 text-2xl font-bold">
                <CalendarDays :size="24" />

                <select
                    v-model="type"
                    class="bg-transparent text-white font-bold cursor-pointer outline-none"
                >
                    <option value="week" class="bg-mist-800 text-white text-lg">
                        This Week
                    </option>
                    <option value="month" class="bg-mist-800 text-white text-lg">
                        This Month
                    </option>
                </select>
            </div>
        </div>

        <div class="flex gap-4 ml-auto w-fit mb-4">
            <button class="cursor-pointer">
                <ListFilter :size="20" class="text-blue-500" />
            </button>
            <button class="cursor-pointer">
                <ArrowDownUp :size="20" class="text-blue-500" />
            </button>
            <button class="cursor-pointer">
                <Search :size="20" class="text-mist-400" />
            </button>
        </div>

        <div class="flex flex-col gap-4 ml-8">
            <HabitsTable 
                :habits="habits" 
                :type="type" 
                :current-date="today" 
                :today="today"
                @toggle="handleToggle" 
                @untoggle="handleUntoggle"
                @toggle-all="handleToggleAll"
                @untoggle-all="handleUntoggleAll" 
                @select-day="emitSelectDay"
            />
        </div>
    </Section>
</template>