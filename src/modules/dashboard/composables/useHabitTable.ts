import { computed, Ref } from 'vue';
import { Habit, Log } from '../../../stores/useHabitsStore';

export function toDateKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function datesAreSame(date1: Date, date2: Date): boolean {
  return toDateKey(new Date(date1)) === toDateKey(new Date(date2));
}

export function getFormattedDate(date: Date): string {
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });
}

function getWeekDates(currentDate: Date): Date[] {
  const date = new Date(currentDate);
  const day = date.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;

  const monday = new Date(date);
  monday.setDate(date.getDate() + diffToMonday);

  return Array.from({ length: 7 }, (_, index) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + index);
    return d;
  });
}

function getMonthDates(currentDate: Date): Date[] {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const lastDay = new Date(year, month + 1, 0).getDate();

  return Array.from(
    { length: lastDay },
    (_, index) => new Date(year, month, index + 1)
  );
}

export function hasLogForDate(habit: Habit, date: Date): boolean {
  return !!getLogForDate(habit, date);
}

export function getLogForDate(habit: Habit, date: Date): Log | undefined {
  const dateKey = toDateKey(date);

  return habit.logs.find(log => {
    const logDate = typeof log.date === 'string'
      ? new Date(log.date)
      : log.date;

    return toDateKey(logDate) === dateKey;
  });
}

export function useHabitLogTable(
  habits: Ref<Habit[]>,
  currentDate: Ref<Date>,
  type: Ref<'week' | 'month'>
) {
  const dates = computed(() =>
    type.value === 'week'
      ? getWeekDates(currentDate.value)
      : getMonthDates(currentDate.value)
  );

  const averages = computed(() => {
    const result: Record<string, string> = {};

    for (const habit of habits.value) {
      const doneCount = dates.value.filter(date =>
        hasLogForDate(habit, date)
      ).length;

      result[habit.id] = (doneCount / dates.value.length).toFixed(2);
    }

    return result;
  });

  const progresses = computed(() => {
    const result: Record<string, number> = {};

    for (const date of dates.value) {
      const doneCount = habits.value.filter(habit =>
        hasLogForDate(habit, date)
      ).length;

      result[toDateKey(date)] = habits.value.length
        ? Math.round((doneCount / habits.value.length) * 100)
        : 0;
    }

    return result;
  });

  return {
    dates,
    averages,
    progresses,
  };
}