<script setup lang="ts">
import { ref } from 'vue';
import Section from '../../components/Section.vue';
import { useHabitsStore } from '../../stores/useHabitsStore.ts';
import Habits from './views/Habits.vue';
import Progress from './views/Progress.vue';

const habitsStore = useHabitsStore();
const today = ref(new Date());
</script>

<template>
    <Section class="grid grid-cols-4 gap-12 p-16">
        <Habits class="col-span-1" :habits="habitsStore.habits" :update-habit="habitsStore.updateHabit" :save-habit="habitsStore.addHabit" :delete-habit="habitsStore.removeHabit" />
        <Progress class="col-span-3" :habits="habitsStore.habits" :today="today" :add-log="habitsStore.addLog" :remove-log="habitsStore.removeLog" />
    </Section>
</template>