import { Log } from './Log';

export type Habit = {
    id: string;
    title: string;
    icon: string;
    logs: Log[];
};
