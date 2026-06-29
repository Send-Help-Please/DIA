import { Habit } from '@/types/Habit';
import { computed, Ref } from 'vue';
import { dateToKey, getMonthDates, getWeekDates } from '../utils/dateUtils';
import { getAverageForHabit, getProgressForDate } from '../utils/statUtils';
import { Log } from '@/types/Log';

export function useHabitLogTable(
    habits: Ref<Habit[]>,
    logs: Ref<Log[]>,
    currentDate: Ref<Date>,
    type: Ref<'week' | 'month'>,
) {
    const dates = computed(() =>
        type.value === 'week'
            ? getWeekDates(currentDate.value)
            : getMonthDates(currentDate.value),
    );

    const averages = computed(() => {
        const result: Record<string, string> = {};

        for (const habit of habits.value) {
            const avg = getAverageForHabit(dates.value, habit, logs.value);
            result[habit.id] = avg;
        }

        return result;
    });

    const progresses = computed(() => {
        const result: Record<string, number> = {};

        for (const date of dates.value) {
            const progress = getProgressForDate(date, habits.value, logs.value);
            result[dateToKey(date)] = progress;
        }

        return result;
    });

    return {
        dates,
        averages,
        progresses,
    };
}
