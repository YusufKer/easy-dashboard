import { useState, useEffect } from "react";
import {
  logsRepository,
  type LogType,
  type LogsData,
} from "@/lib/api/repositories/logsRepository";
import LogCard from "@/components/LogCard";

const LOG_TYPES: { value: LogType; label: string }[] = [
  { value: "app", label: "App" },
  { value: "access", label: "Access" },
  { value: "error", label: "Error" },
  { value: "security", label: "Security" },
];

export default function LogsPage() {
  const [selectedType, setSelectedType] = useState<LogType | undefined>(
    undefined
  );
  const [logsData, setLogsData] = useState<LogsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLogs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await logsRepository.getLogs(selectedType);
      setLogsData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch logs");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedType]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">System Logs</h1>
        <p className="text-slate-600">
          View and monitor application logs by type
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedType(undefined)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedType === undefined
              ? "bg-indigo-600 text-white"
              : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50"
          }`}
        >
          All Logs
        </button>
        {LOG_TYPES.map((type) => (
          <button
            key={type.value}
            onClick={() => setSelectedType(type.value)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedType === type.value
                ? "bg-indigo-600 text-white"
                : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50"
            }`}
          >
            {type.label}
          </button>
        ))}
        <button
          onClick={() => fetchLogs()}
          className="ml-auto px-4 py-2 rounded-lg font-medium bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 transition-colors"
        >
          Refresh
        </button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <p className="text-red-800 font-medium">Failed to load logs</p>
          <p className="text-red-600 text-sm mt-1">{error}</p>
        </div>
      )}

      {/* Logs List */}
      {logsData && !isLoading && (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-slate-600">
              <span className="font-medium">{logsData.lines_returned}</span> log
              {logsData.lines_returned !== 1 ? "s" : ""} found
              {logsData.date && (
                <span className="ml-2">
                  • <span className="font-medium">{logsData.date}</span>
                </span>
              )}
            </p>
          </div>

          {logsData.logs.length === 0 ? (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-12 text-center">
              <p className="text-slate-600">No logs found for this filter</p>
            </div>
          ) : (
            <div className="space-y-3">
              {logsData.logs.map((log, index) => (
                <LogCard key={`${log.datetime}-${index}`} log={log} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
