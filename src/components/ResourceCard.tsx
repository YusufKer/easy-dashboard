interface ResourceCardProps {
  id: number;
  name: string;
  onDelete: (id: number) => void;
}

export default function ResourceCard({ id, name, onDelete }: ResourceCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900 capitalize">
            {name}
          </h3>
          <span className="text-sm text-gray-500">ID: {id}</span>
        </div>
        <button
          onClick={() => onDelete(id)}
          className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
