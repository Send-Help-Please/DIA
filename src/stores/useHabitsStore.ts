import { Ban, Bed, CalendarDays, Droplet, LucideIcon, Utensils } from "@lucide/vue";
import { defineStore } from "pinia";
import { ref } from "vue";

export type Log = {
  id: string;
  habitId: string;
  date: Date;
};

export type Habit = {
  id: string;
  title: string;
  icon: LucideIcon;
  logs: Log[];
};

const today = new Date();

const daysAgo = (days: number) => {
  const date = new Date(today);
  date.setDate(date.getDate() - days);
  return date;
};

export const useHabitsStore = defineStore('habits', () => {
    const habits = ref<Habit[]>(
        [
            {
                id: "habit-1",
                icon: Bed,
                title: "Sleep 7-8 hours",
                logs: [
                { id: "log-1", habitId: "habit-1", date: daysAgo(0) },
                { id: "log-2", habitId: "habit-1", date: daysAgo(1) },
                { id: "log-3", habitId: "habit-1", date: daysAgo(2) },
                { id: "log-4", habitId: "habit-1", date: daysAgo(4) },
                { id: "log-5", habitId: "habit-1", date: daysAgo(6) },
                ]
            },
            {
                id: "habit-2",
                icon: Utensils,
                title: "Eat healthy meals",
                logs: [
                { id: "log-6", habitId: "habit-2", date: daysAgo(0) },
                { id: "log-7", habitId: "habit-2", date: daysAgo(1) },
                { id: "log-8", habitId: "habit-2", date: daysAgo(3) },
                { id: "log-9", habitId: "habit-2", date: daysAgo(5) },
                ]
            },
            {
                id: "habit-3",
                icon: Ban,
                title: "No porn/alcohol",
                logs: [
                { id: "log-10", habitId: "habit-3", date: daysAgo(0) },
                { id: "log-11", habitId: "habit-3", date: daysAgo(1) },
                { id: "log-12", habitId: "habit-3", date: daysAgo(2) },
                { id: "log-13", habitId: "habit-3", date: daysAgo(3) },
                { id: "log-14", habitId: "habit-3", date: daysAgo(4) },
                { id: "log-15", habitId: "habit-3", date: daysAgo(5) },
                { id: "log-16", habitId: "habit-3", date: daysAgo(6) },
                ]
            },
            {
                id: "habit-4",
                icon: Droplet,
                title: "Drink 2L water",
                logs: [
                { id: "log-17", habitId: "habit-4", date: daysAgo(0) },
                { id: "log-18", habitId: "habit-4", date: daysAgo(2) },
                { id: "log-19", habitId: "habit-4", date: daysAgo(4) },
                { id: "log-20", habitId: "habit-4", date: daysAgo(6) },
                ]
            },
            {
                id: "habit-5",
                icon: CalendarDays,
                title: "Plan tomorrow",
                logs: [
                { id: "log-21", habitId: "habit-5", date: daysAgo(0) },
                { id: "log-22", habitId: "habit-5", date: daysAgo(1) },
                { id: "log-23", habitId: "habit-5", date: daysAgo(2) },
                ]
            },
            {
                id: "habit-6",
                icon: Bed,
                title: "Wake up before 7 AM",
                logs: [
                { id: "log-24", habitId: "habit-6", date: daysAgo(1) },
                { id: "log-25", habitId: "habit-6", date: daysAgo(3) },
                { id: "log-26", habitId: "habit-6", date: daysAgo(5) },
                ]
            },
            {
                id: "habit-7",
                icon: Utensils,
                title: "No junk food",
                logs: [
                { id: "log-27", habitId: "habit-7", date: daysAgo(0) },
                { id: "log-28", habitId: "habit-7", date: daysAgo(2) },
                { id: "log-29", habitId: "habit-7", date: daysAgo(3) },
                { id: "log-30", habitId: "habit-7", date: daysAgo(6) },
                ]
            },
            {
                id: "habit-8",
                icon: Droplet,
                title: "Take vitamins",
                logs: [
                { id: "log-31", habitId: "habit-8", date: daysAgo(0) },
                { id: "log-32", habitId: "habit-8", date: daysAgo(1) },
                { id: "log-33", habitId: "habit-8", date: daysAgo(2) },
                { id: "log-34", habitId: "habit-8", date: daysAgo(4) },
                { id: "log-35", habitId: "habit-8", date: daysAgo(6) },
                ]
            },
        ]
    );

    const addHabit = (habit: Habit) => {
        habits.value.push(habit);
    }

    const removeHabit = (habit: Habit) => {
        habits.value = habits.value.filter(curr => curr.id !== habit.id);
    }

    const addLog = (log: Log) => {
        const i = habits.value.findIndex(habit => habit.id === log.habitId);
        if(i < 0) throw new Error(`No habit with id: ${log.habitId}`);

        habits.value[i].logs.push(log);
    }

    const removeLog = (log: Log) => {
        const i = habits.value.findIndex(habit => habit.id === log.habitId);
        if(i < 0) throw new Error(`No habit with id: ${log.habitId}`);

        habits.value[i].logs = habits.value[i].logs.filter(curr => curr.id !== log.id);
    }

    return {
        habits,

        addHabit,
        removeHabit,
        addLog,
        removeLog
    }
});