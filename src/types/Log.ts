export type Log = {
    id: string;
    habitId: string;
    logDate: Date;
};

export type LogDTO = {
    id: string;
    habit_id: string;
    log_date: string;
}

export type CreateLogPayload = {
    habitId: string;
    logDate: Date;
}

export type CreateLogInput = {
    habit_id: string;
    log_date: string;
}

export type DeleteLogPayload = {
    habitId: string;
    logId: string;
}

export type DeleteLogInput = {
    habit_id: string;
    log_id: string;
}