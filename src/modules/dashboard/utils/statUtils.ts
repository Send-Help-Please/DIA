import { Habit } from '@/types/Habit';
import { hasLogForDate } from './logUtils';

export function getProgressForDate(date: Date, habits: Habit[]) {
    const doneCount = habits.filter((habit) =>
        hasLogForDate(habit, date),
    ).length;

    return habits.length > 0
        ? Math.round((doneCount / habits.length) * 100)
        : 0;
}

export function getAverageForHabit(dates: Date[], habit: Habit) {
    const doneCount = dates.filter((date) => hasLogForDate(habit, date)).length;

    return (doneCount / dates.length).toFixed(2);
}
