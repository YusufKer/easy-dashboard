interface AddResourceFormProps {
  resourceName: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  submitting: boolean;
}

export default function AddResourceForm({
  resourceName,
  value,
  onChange,
  onSubmit,
  submitting,
}: AddResourceFormProps) {
  const inputId = `${resourceName}Name`;
  const capitalizedResourceName =
    resourceName.charAt(0).toUpperCase() + resourceName.slice(1);

  return (
    <form
      onSubmit={onSubmit}
      className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200"
    >
      <div className="flex gap-3 items-end">
        <div className="flex-1">
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {capitalizedResourceName} Name
          </label>
          <input
            id={inputId}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={`Enter ${resourceName} name`}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={submitting}
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {submitting ? "Adding..." : "Add"}
        </button>
      </div>
    </form>
  );
}
