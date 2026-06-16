<script setup lang="ts">
import { computed } from 'vue'
import HabitProgressBar from '../components/HabitProgressBar.vue';
import { Habit } from '../../../stores/useHabitsStore';
import { useIconComponent } from '../composables/useIconComponent.ts';

const props = defineProps<{
    day: Date,
    habits: Habit[]
}>()

defineEmits<{
    close: []
}>();

function getFormattedDate(date: Date): string {
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });
}

const weekday = computed(() => {
    return props.day.toLocaleString('en-US', { weekday: 'long' })
});
</script>

<template>
    <div class="bg-mist-900 border border-mist-700 rounded-md p-16 text-white w-96">
        <div class="mb-6">
            <h2 class="text-3xl font-bold">
                {{ getFormattedDate(day) }}
            </h2>

            <p class="text-mist-400 mt-1">
                {{ weekday }}
            </p>
        </div>

        <div class="mb-6">
            <p class="text-sm text-mist-400 mb-2">
                Progress
            </p>

            <HabitProgressBar :progress="76" />
        </div>

        <div class="mb-6">
            <p class="text-sm text-mist-400 mb-3">
                Habits
            </p>

            <div class="flex flex-col gap-3">
                <label
                    v-for="habit in habits"
                    :key="habit.id"
                    class="flex items-center justify-between text-sm"
                >
                    <span class="flex items-center gap-2"><component :is="useIconComponent(habit.icon).component" /> {{  habit.title }}</span>

                    <input
                        type="checkbox"
                        class="size-4 rounded border-mist-600 bg-mist-800"
                    />
                </label>
            </div>
        </div>

        <hr />

        <div>
            <textarea
                placeholder="Add your notes here"
                class="w-full resize-none mt-4 bg-transparent text-sm text-white placeholder:text-mist-500 outline-none min-h-24"
            />
        </div>
    </div>
</template>