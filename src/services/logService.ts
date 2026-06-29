import { LogsRepository } from "@/repositories/logsRepository";
import { CreateLogPayload, DeleteLogPayload } from "@/types/Log";

class LogsService {
  private logsRepo = new LogsRepository();

  async createLog(payload: CreateLogPayload) {
    return await this.logsRepo.createLog(payload);
  }

  async deleteLog(payload: DeleteLogPayload) {
    return await this.logsRepo.deleteLog(payload);
  } 

  async listLogs() {
    return await this.logsRepo.listLogs();
  }
}

export const logsService = new LogsService();