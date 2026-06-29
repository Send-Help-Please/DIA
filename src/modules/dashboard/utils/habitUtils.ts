import { Habit } from '@/types/Habit';
import { hasLogForDate } from './logUtils';
import { Log } from '@/types/Log';

export function isHabitDoneForDate(habit: Habit, logs: Log[], date: Date): boolean {
    return hasLogForDate(habit, logs, date);
}

export function isEveryHabitDoneForDate(habits: Habit[], logs: Log[], date: Date): boolean {
    return (
        habits.length > 0 &&
        habits.every((habit) => isHabitDoneForDate(habit, logs, date))
    );
}
