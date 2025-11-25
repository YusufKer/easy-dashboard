import { Link } from "react-router-dom";

interface ResourceCardProps {
  id: number;
  name: string;
  onDelete: (id: number) => void;
  detailPath?: string;
}

export default function ResourceCard({
  id,
  name,
  onDelete,
  detailPath,
}: ResourceCardProps) {
  const content = (
    <>
      <div>
        <h3 className="text-lg font-semibold text-slate-900 capitalize">
          {name}
        </h3>
        <span className="text-sm text-slate-500">ID: {id}</span>
      </div>
      <button
        onClick={() => onDelete(id)}
        className="px-3 py-1.5 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
      >
        Delete
      </button>
    </>
  );

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-lg hover:border-indigo-200 transition-all">
      <div className="flex items-center justify-between">
        {detailPath ? (
          <>
            <Link to={detailPath} className="flex-1">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 capitalize hover:text-indigo-600 transition-colors">
                  {name}
                </h3>
                <span className="text-sm text-slate-500">ID: {id}</span>
              </div>
            </Link>
            <button
              onClick={() => onDelete(id)}
              className="px-3 py-1.5 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
            >
              Delete
            </button>
          </>
        ) : (
          content
        )}
      </div>
    </div>
  );
}
