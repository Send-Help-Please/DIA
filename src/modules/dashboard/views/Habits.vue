<script setup lang="ts">
import { List } from '@lucide/vue';
import Section from '../../../components/Section.vue';
import HeaderText from '../components/HeaderText.vue';
import GuideText from '../components/GuideText.vue';
import HabitsList from '../components/HabitsList.vue';
import { Habit } from '../../../stores/useHabitsStore.ts';

defineProps<{ habits: Habit[] }>();
</script>

<template>
    <Section class="flex flex-col gap-4 w-full text-white">
        <GuideText>Progress not Perfection</GuideText>

        <Section class="rounded-md p-8 px-6 flex flex-col gap-4 bg-mist-800">
            <HeaderText>
                <List /> Habit List
            </HeaderText>
            
            <HabitsList :habits="habits" />
        </Section>
    </Section>
</template>