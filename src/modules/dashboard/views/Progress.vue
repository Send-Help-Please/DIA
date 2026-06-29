<script setup lang="ts">
import Section from '@/components/Section.vue';

import { CalendarDays, ArrowDownUp, Search, ListFilter } from '@lucide/vue';
import HabitsTable from '../components/HabitsTable.vue';
import { ref } from 'vue';
import Button from '@/components/Button.vue';
import { Habit } from '@/types/Habit.ts';
import { Log } from '@/types/Log.ts';
import SelectInput from '@/components/SelectInput.vue';

const props = defineProps<{
    habits: Habit[];
    logs: Log[];
    today: Date;
    addLog: (log: Omit<Log, 'id'>) => Promise<void>;
    removeLog: (log: Log) => Promise<void>;
}>();

const emit = defineEmits<{
    selectDay: [Date];
}>();

const type = ref<'week' | 'month'>('week');

async function handleToggle(date: Date, habitId: string) {
    await props.addLog({ logDate: date, habitId });
}

async function handleUntoggle(log: Log) {
    await props.removeLog(log);
}

async function handleToggleAll(date: Date, habitIds: string[]) {
    for (const id of habitIds) {
        await handleToggle(date, id);
    }
}

async function handleUntoggleAll(logs: Log[]) {
    for (const log of logs) {
        await handleUntoggle(log);
    }
}

function emitSelectDay(date: Date) {
    emit('selectDay', date);
}
</script>

<template>
    <Section
        class="bg-card-bg text-header p-8 px-6 rounded-md min-w-xl overflow-x-auto"
    >
        <div class="mb-4 flex items-center gap-3">
            <div class="flex items-center gap-2 text-2xl font-bold">
                <CalendarDays :size="24" />

                <SelectInput
                    v-model:value="type"
                    :border="false" 
                    :options="[{ value: 'week', label: 'This Week' }, { value: 'month', label: 'This Month' }]"
                />
            </div>
        </div>

        <div class="flex gap-4 ml-auto w-fit mb-4">
            <Button>
                <ListFilter :size="20" class="text-blue-500" />
            </Button>
            <Button>
                <ArrowDownUp :size="20" class="text-blue-500" />
            </Button>
            <Button>
                <Search :size="20" class="text-text" />
            </Button>
        </div>

        <div class="flex flex-col gap-4 ml-8">
            <HabitsTable
                :habits="habits"
                :logs="logs"
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
