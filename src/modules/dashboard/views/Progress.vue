<script setup lang="ts">
import Section from '../../../components/Section.vue';

import { CalendarDays, ArrowDownUp, Search, ListFilter } from '@lucide/vue';
import HabitsTable from '../components/HabitsTable.vue';
import { Habit } from '../../../stores/useHabitsStore.ts';

defineProps<{ habits: Habit[], today: Date }>();
</script>

<template>
    <Section class="bg-mist-800 text-white p-8 px-6 rounded-md">
        <h1 class="flex items-center gap-2 text-2xl font-bold mb-4"><CalendarDays /> This Week</h1>

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
            <HabitsTable :habits="habits" type="week" :current-date="today" />
        </div>
    </Section>
</template>