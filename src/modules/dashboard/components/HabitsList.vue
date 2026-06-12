<script setup lang="ts">
export type Habit = {
    title: string;
}

defineProps<{ habits: Habit[] }>();
</script>

<template>
    <ul class="list-disc ml-12">
        <li v-for="habit in habits" v-bind:key="habit.title" class="my-4">{{ habit.title }}</li>
    </ul>
</template>