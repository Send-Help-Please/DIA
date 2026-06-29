import {
  CreateLogInput,
  CreateLogPayload,
  DeleteLogInput,
  DeleteLogPayload,
  Log,
  LogDTO,
} from "@/types/Log";
import { dateToString } from "@/utils/dateUtils";
import { invoke } from "@tauri-apps/api/core";

export class LogsRepository {
  private mapCreateLogToInput(payload: CreateLogPayload): CreateLogInput {
    return {
      habit_id: payload.habitId,
      log_date: dateToString(payload.logDate),
    };
  }

  private mapDeleteLogToInput(payload: DeleteLogPayload): DeleteLogInput {
    return {
      habit_id: payload.habitId,
      log_id: payload.logId,
    };
  }

  private mapDTOToLog(dto: LogDTO): Log {
    return {
      id: dto.id,
      habitId: dto.habit_id,
      logDate: new Date(dto.log_date),
    };
  }

  private mapDTOsToLogs(dtos: LogDTO[]): Log[] {
    const logs: Log[] = [];

    for (const dto of dtos) {
      logs.push(this.mapDTOToLog(dto));
    }

    return logs;
  }

  async createLog(payload: CreateLogPayload) {
    const input = this.mapCreateLogToInput(payload);

    const logDTO = await invoke("create_log", { input }) as LogDTO;

    return this.mapDTOToLog(logDTO);
  }

  async deleteLog(payload: DeleteLogPayload) {
    const input = this.mapDeleteLogToInput(payload);

    return await invoke("delete_log", { input });
  }

  async listLogs() {
    const logDTOs = await invoke("list_logs", {}) as LogDTO[];

    return this.mapDTOsToLogs(logDTOs);
  }
}