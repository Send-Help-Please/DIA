import { Habit } from '@/types/Habit';
import { hasLogForDate } from './logUtils';

export function isHabitDoneForDate(habit: Habit, date: Date): boolean {
    return hasLogForDate(habit, date);
}

export function isEveryHabitDoneForDate(habits: Habit[], date: Date): boolean {
    return (
        habits.length > 0 &&
        habits.every((habit) => isHabitDoneForDate(habit, date))
    );
}
