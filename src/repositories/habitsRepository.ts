import { CreateHabitInput, CreateHabitPayload, DeleteHabitInput, DeleteHabitPayload, EditHabitInput, EditHabitPayload, Habit, HabitDTO, ListHabitsInput, ListHabitsPayload } from "@/types/Habit";
import { invoke } from "@tauri-apps/api/core";

export class HabitsRepository {
    private mapCreateHabitToInput(payload: CreateHabitPayload): CreateHabitInput {
        return {
            profile_id: payload.profileId,
            title: payload.title,
            icon: payload.icon
        }
    }

    private mapEditHabitToInput(payload: EditHabitPayload): EditHabitInput {
        return {
            profile_id: payload.profileId,
            habit_id: payload.habitId,
            title: payload.title,
            icon: payload.icon
        }
    }

    private mapDeleteHabitToInput(payload: DeleteHabitPayload): DeleteHabitInput {
        return {
            profile_id: payload.profileId,
            habit_id: payload.habitId
        }
    }

    private mapListHabitsToInput(payload: ListHabitsPayload): ListHabitsInput {
        return {
            profile_id: payload.profileId
        }
    }

    private mapDTOToHabit(dto: HabitDTO): Habit {
        return {
            id: dto.id,
            title: dto.title,
            icon: dto.icon
        }
    }

    private mapDTOsToHabits(dtos: HabitDTO[]): Habit[] {
        const habits: Habit[] = [];
        for(const dto of dtos){ habits.push(this.mapDTOToHabit(dto)) }

        return habits;
    }
    
    async createHabit(payload: CreateHabitPayload) {
        const input = this.mapCreateHabitToInput(payload);

        const habitDTO = await invoke("create_habit", { input }) as HabitDTO;
        return this.mapDTOToHabit(habitDTO);
    }

    async editHabit(payload: EditHabitPayload) {
        const input = this.mapEditHabitToInput(payload);

        const habitDTO = await invoke("edit_habit", { input }) as HabitDTO;
        return this.mapDTOToHabit(habitDTO);
    }

    async deleteHabit(payload: DeleteHabitPayload) {
        const input = this.mapDeleteHabitToInput(payload);

        return await invoke("delete_habit", { input });
    }

    async listHabits(payload: ListHabitsPayload) {
        const input = this.mapListHabitsToInput(payload);

        const habitDTOs = await invoke("list_habits", { input }) as HabitDTO[];

        return this.mapDTOsToHabits(habitDTOs);
    }
}