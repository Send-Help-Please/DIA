import { Habit } from '@/types/Habit';
import { datesAreSame } from './dateUtils';
import { Log } from '@/types/Log';

export function getLogForDate(habit: Habit, logs: Log[], date: Date): Log | undefined {
    return logs.find((log) => {
        return habit.id === log.habitId && datesAreSame(log.logDate, date);
    });
}

export function getLogsForDate(habits: Habit[], logs: Log[], date: Date): Log[] {
    return habits
        .map((habit) => getLogForDate(habit, logs, date))
        .filter((log): log is Log => !!log);
}

export function hasLogForDate(habit: Habit, logs: Log[], date: Date): boolean {
    return !!getLogForDate(habit, logs, date);
}
