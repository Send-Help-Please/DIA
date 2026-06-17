import { Habit } from '@/types/Habit';
import { datesAreSame } from './dateUtils';
import { Log } from '@/types/Log';

export function getLogForDate(habit: Habit, date: Date): Log | undefined {
    return habit.logs.find((log) => {
        return datesAreSame(log.date, date);
    });
}

export function getLogsForDate(habits: Habit[], date: Date): Log[] {
    return habits
        .map((habit) => getLogForDate(habit, date))
        .filter((log): log is Log => !!log);
}

export function hasLogForDate(habit: Habit, date: Date): boolean {
    return !!getLogForDate(habit, date);
}
