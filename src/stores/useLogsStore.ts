import { logsService } from '@/services/logService';
import { Log } from '@/types/Log';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLogsStore = defineStore('logs', () => {
    const logs = ref<Log[]>([]);
    const loaded = ref<boolean>(false);

    const loadLogs = async () => {
        if(loaded.value) return;
        logs.value = await logsService.listLogs();
    }

    const createLog = async (log: Omit<Log, "id">) => {
        const result = await logsService.createLog({ ...log })
        logs.value.push(result);
    }

    const deleteLog = async (log: Log) => {
        await logsService.deleteLog({ habitId: log.habitId, logId: log.id });
        logs.value = logs.value.filter(l => l.id !== log.id);
    }

    return {
        logs,

        loadLogs,
        createLog,
        deleteLog
    }
});
