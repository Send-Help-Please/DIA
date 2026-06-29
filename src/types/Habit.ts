export type Habit = {
    id: string;
    title: string;
    icon: string;
};

export type HabitDTO = {
    id: string;
    title: string;
    icon: string;
}

export type CreateHabitPayload = {
   profileId: string;
   title: string;
   icon: string;
}

export type CreateHabitInput = {
    profile_id: string;
    title: string;
    icon: string;
}

export type EditHabitPayload = {
    profileId: string;
    habitId: string;
    title: string;
    icon: string;
}

export type EditHabitInput = {
    profile_id: string;
    habit_id: string;
    title: string;
    icon: string;
}

export type DeleteHabitPayload = {
    profileId: string;
    habitId: string;
}

export type DeleteHabitInput = {
    profile_id: string;
    habit_id: string;
}

export type ListHabitsPayload = {
    profileId: string;
}

export type ListHabitsInput = {
    profile_id: string;
}