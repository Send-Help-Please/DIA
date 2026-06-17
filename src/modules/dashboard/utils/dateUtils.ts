export function dateToKey(date: Date): string {
    return date.toISOString().slice(0, 10);
}

export function getFormattedDate(date: Date): string {
    return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    });
}

export function getWeekDay(date: Date): string {
    return date.toLocaleString('en-US', { weekday: 'long' });
}

export function datesAreSame(date1: Date, date2: Date): boolean {
    return dateToKey(new Date(date1)) === dateToKey(new Date(date2));
}

export function getWeekDates(currentDate: Date): Date[] {
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

export function getMonthDates(currentDate: Date): Date[] {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const lastDay = new Date(year, month + 1, 0).getDate();

    return Array.from(
        { length: lastDay },
        (_, index) => new Date(year, month, index + 1),
    );
}
