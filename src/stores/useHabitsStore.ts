import { Habit } from '@/types/Habit';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useProfileStore } from './useProfileStore';
import { habitService } from '@/services/habitService';

export const useHabitsStore = defineStore('habits', () => {
    const habits = ref<Habit[]>([]);
    const loaded = ref<boolean>(false);
    const profileId = useProfileStore().profileId;

    const loadHabits = async () => {
        if(loaded.value) return;

        const result = await habitService.listHabits({ profileId });
        habits.value = result;
    }

    const createHabit = async (habit: Omit<Habit, 'id'>) => {
        const result = await habitService.createHabit({ profileId, title: habit.title, icon: habit.icon });
        habits.value.push(result);
    };

    const editHabit = async (habit: Habit) => {
        const i = habits.value.findIndex((curr) => curr.id === habit.id);
        if (i < 0) return;

        const editedHabit = { ...habit, profileId, habitId: habit.id };

        const result = await habitService.editHabit(editedHabit);
        habits.value[i] = result;
    }

    const deleteHabit = async (habit: Habit) => {
        await habitService.deleteHabit({ profileId, habitId: habit.id });
        habits.value = habits.value.filter((curr) => curr.id !== habit.id);
    }

    return {
        habits,

        loadHabits,
        createHabit,
        editHabit,
        deleteHabit,
    };
});
