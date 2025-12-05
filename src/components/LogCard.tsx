import type { LogEntry } from "@/lib/api/repositories/logsRepository";

interface LogCardProps {
  log: LogEntry;
}

const getLevelColor = (levelName: string): string => {
  switch (levelName) {
    case "ERROR":
      return "bg-red-100 text-red-800 border-red-200";
    case "WARNING":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "INFO":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "DEBUG":
      return "bg-gray-100 text-gray-800 border-gray-200";
    default:
      return "bg-slate-100 text-slate-800 border-slate-200";
  }
};

export default function LogCard({ log }: LogCardProps) {
  const formattedDate = new Date(log.datetime).toLocaleString();

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md transition-all">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg border ${getLevelColor(log.level_name)}`}
            >
              {log.level_name}
            </span>
            <span className="text-xs text-slate-500">{log.channel}</span>
          </div>
          <p className="text-sm font-medium text-slate-900">{log.message}</p>
        </div>
        <span className="text-xs text-slate-500 whitespace-nowrap">
          {formattedDate}
        </span>
      </div>

      {log.extra && (
        <div className="space-y-2 mt-3 pt-3 border-t border-slate-100">
          {log.extra.url && (
            <div className="flex gap-2 text-xs">
              <span className="text-slate-500 font-medium">URL:</span>
              <span className="text-slate-700">
                {log.extra.http_method} {log.extra.url}
              </span>
            </div>
          )}
          {log.extra.ip && (
            <div className="flex gap-2 text-xs">
              <span className="text-slate-500 font-medium">IP:</span>
              <span className="text-slate-700">{log.extra.ip}</span>
            </div>
          )}
          {log.extra.file && (
            <div className="flex gap-2 text-xs">
              <span className="text-slate-500 font-medium">File:</span>
              <span className="text-slate-700 font-mono text-[11px]">
                {log.extra.file}:{log.extra.line}
              </span>
            </div>
          )}
          {log.extra.uid && (
            <div className="flex gap-2 text-xs">
              <span className="text-slate-500 font-medium">UID:</span>
              <span className="text-slate-700 font-mono">{log.extra.uid}</span>
            </div>
          )}
        </div>
      )}

      {log.context &&
        typeof log.context === "object" &&
        !Array.isArray(log.context) &&
        Object.keys(log.context).length > 0 && (
          <div className="mt-3 pt-3 border-t border-slate-100">
            <span className="text-xs text-slate-500 font-medium">Context:</span>
            <pre className="mt-1 text-xs bg-slate-50 p-2 rounded border border-slate-200 overflow-x-auto">
              {JSON.stringify(log.context, null, 2)}
            </pre>
          </div>
        )}
    </div>
  );
}
