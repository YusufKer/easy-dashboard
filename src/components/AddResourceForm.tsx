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
      className="mb-6 bg-slate-50 p-5 rounded-xl border border-slate-200"
    >
      <div className="flex gap-3 items-end">
        <div className="flex-1">
          <label
            htmlFor={inputId}
            className="block text-sm font-semibold text-slate-700 mb-2"
          >
            {capitalizedResourceName} Name
          </label>
          <input
            id={inputId}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={`Enter ${resourceName} name`}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            disabled={submitting}
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="px-5 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all disabled:bg-slate-400 disabled:cursor-not-allowed font-medium shadow-sm hover:shadow"
        >
          {submitting ? "Adding..." : "Add"}
        </button>
      </div>
    </form>
  );
}
