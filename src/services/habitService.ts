import { HabitsRepository } from "@/repositories/habitsRepository";
import { CreateHabitPayload, DeleteHabitPayload, EditHabitPayload, ListHabitsPayload } from "@/types/Habit";

class HabitService {
    private habitsRepo = new HabitsRepository();

    async listHabits(payload: ListHabitsPayload) {
        return await this.habitsRepo.listHabits(payload);
    }

    async createHabit(payload: CreateHabitPayload) {
        return await this.habitsRepo.createHabit(payload);
    }

    async editHabit(payload: EditHabitPayload) {
        return await this.habitsRepo.editHabit(payload);
    }

    async deleteHabit(payload: DeleteHabitPayload) {
        return await this.habitsRepo.deleteHabit(payload);
    }
}

export const habitService = new HabitService();