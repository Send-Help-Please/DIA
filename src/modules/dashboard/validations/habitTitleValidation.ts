import { Habit } from '@/types/Habit';

function getHabitTitleAndIds(habits: Habit[]) {
    return habits.map((h) => ({
        id: h.id,
        title: h.title.trim().toLowerCase(),
    }));
}

export function validateHabitTitle(id: string, title: string, habits: Habit[]) {
    const value = title.trim();

    if (!value) return 'Title is required.';
    if (value.length < 2) return 'Title must be at least 2 characters.';
    if (value.length > 50) return 'Title must be 50 characters or less.';

    const habitTitleAndIds = getHabitTitleAndIds(habits);

    const duplicate = habitTitleAndIds.some(
        (h) => h.id !== id && h.title === value.toLowerCase(),
    );

    if (duplicate) return 'Habit title already exists.';

    return '';
}

export function validateNewHabitTitle(title: string, habits: Habit[]) {
    const value = title.trim();

    if (!value) return 'Title is required.';
    if (value.length < 2) return 'Title must be at least 2 characters.';
    if (value.length > 50) return 'Title must be 50 characters or less.';

    const habitTitleAndIds = getHabitTitleAndIds(habits);

    const duplicate = habitTitleAndIds.some(
        (h) => h.title === value.toLowerCase(),
    );

    if (duplicate) return 'Habit title already exists.';

    return '';
}
