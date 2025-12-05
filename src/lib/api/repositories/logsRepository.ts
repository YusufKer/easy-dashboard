import { API_URL } from "@/config/env";
import type { ApiResponse } from "@/lib/api/types";
import { authenticatedFetch } from "@/lib/api/client";

export type LogType = "app" | "access" | "error" | "security";

export interface LogEntry {
  message: string;
  context: Record<string, unknown> | unknown[];
  level: number;
  level_name: string;
  channel: string;
  datetime: string;
  extra: {
    file?: string;
    line?: number;
    class?: string;
    callType?: string;
    function?: string;
    url?: string;
    ip?: string;
    http_method?: string;
    server?: string;
    referrer?: string | null;
    uid?: string;
  };
}

export interface LogsData {
  type: string;
  date: string;
  lines_returned: number;
  logs: LogEntry[];
}

class LogsRepository {
  async getLogs(type?: LogType): Promise<LogsData> {
    const params = new URLSearchParams();
    if (type) {
      params.append("type", type);
    }

    const url = `${API_URL}/logs${
      params.toString() ? `?${params.toString()}` : ""
    }`;

    const response = await authenticatedFetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to fetch logs");
    }

    const result: ApiResponse<LogsData> = await response.json();

    if (!result.success) {
      throw new Error(result.message);
    }

    return result.data;
  }
}

export const logsRepository = new LogsRepository();
