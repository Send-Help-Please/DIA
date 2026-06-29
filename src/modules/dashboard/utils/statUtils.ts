import { Habit } from '@/types/Habit';
import { hasLogForDate } from './logUtils';
import { Log } from '@/types/Log';

export function getProgressForDate(date: Date, habits: Habit[], logs: Log[]) {
    const doneCount = habits.filter((habit) =>
        hasLogForDate(habit, logs, date),
    ).length;

    return habits.length > 0
        ? Math.round((doneCount / habits.length) * 100)
        : 0;
}

export function getAverageForHabit(dates: Date[], habit: Habit, logs: Log[]) {
    const doneCount = dates.filter((date) => hasLogForDate(habit, logs, date)).length;

    return (doneCount / dates.length).toFixed(2);
}
