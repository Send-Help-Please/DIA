<script setup lang="ts">
import { ref } from 'vue';
import Section from '../../components/Section.vue';
import { useHabitsStore } from '../../stores/useHabitsStore.ts';
import Habits from './views/Habits.vue';
import Progress from './views/Progress.vue';
import DayDetails from './views/DayDetails.vue';

const habitsStore = useHabitsStore();

const today = ref(new Date());
const selectedDay = ref<Date | null>(null);

function handleSelectDay(date: Date) {
    selectedDay.value = date;
}

function closeDayDetails() {
    selectedDay.value = null;
}
</script>

<template>
    <div>
        <Section class="grid grid-cols-4 gap-12 p-16">    
            <Habits 
                class="col-span-1" 
                :habits="habitsStore.habits" 
                :update-habit="habitsStore.updateHabit" 
                :save-habit="habitsStore.addHabit" 
                :delete-habit="habitsStore.removeHabit" 
            />

            <Progress 
                class="col-span-3" 
                :habits="habitsStore.habits" 
                :today="today" 
                :add-log="habitsStore.addLog" 
                :remove-log="habitsStore.removeLog"
                @select-day="handleSelectDay" 
            />
        </Section>

        <Transition name="fade">
            <div
                v-if="selectedDay"
                class="fixed inset-0 bg-black/40 z-40"
                @click="closeDayDetails"
            />
        </Transition>

        <Transition name="slide-panel">
            <DayDetails
                v-if="selectedDay"
                class="fixed top-0 right-0 h-screen w-[420px] z-50 shadow-2xl"
                :day="selectedDay"
                :habits="habitsStore.habits"
            />
        </Transition>
    </div>
</template>

<style scoped>
.slide-panel-enter-active,
.slide-panel-leave-active {
    transition: transform 0.25s ease, opacity 0.25s ease;
}

.slide-panel-enter-from,
.slide-panel-leave-to {
    transform: translateX(100%);
    opacity: 0;
}

.slide-panel-enter-to,
.slide-panel-leave-from {
    transform: translateX(0);
    opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
}
</style>