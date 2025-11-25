import { useResourceList } from "@/hooks/useResourceList";
import AddResourceForm from "@/components/AddResourceForm";
import ResourceCard from "@/components/ResourceCard";

interface ListPageProps {
  endpoint: string;
  title: string;
  resourceName: string;
  detailPathTemplate?: string;
}

export default function ListPage({
  endpoint,
  title,
  resourceName,
  detailPathTemplate,
}: ListPageProps) {
  const {
    items,
    loading,
    error,
    showAddForm,
    setShowAddForm,
    newItemName,
    setNewItemName,
    submitting,
    handleDelete,
    handleAdd,
  } = useResourceList(endpoint, resourceName);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-slate-600">Loading {resourceName}s...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-900 font-medium">Error: {error}</p>
      </div>
    );
  }

  const capitalizedResourceName =
    resourceName.charAt(0).toUpperCase() + resourceName.slice(1);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all shadow-sm hover:shadow font-medium"
        >
          {showAddForm ? "Cancel" : `Add ${capitalizedResourceName}`}
        </button>
      </div>

      {showAddForm && (
        <AddResourceForm
          resourceName={resourceName}
          value={newItemName}
          onChange={setNewItemName}
          onSubmit={handleAdd}
          submitting={submitting}
        />
      )}

      {items.length === 0 ? (
        <p className="text-slate-500">No {resourceName}s found</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <ResourceCard
              key={item.id}
              id={item.id}
              name={item.name}
              onDelete={handleDelete}
              detailPath={
                detailPathTemplate
                  ? detailPathTemplate.replace(":id", item.id.toString())
                  : undefined
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
