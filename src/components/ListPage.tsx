import { useResourceList } from "@/hooks/useResourceList";
import AddResourceForm from "@/components/AddResourceForm";
import ResourceCard from "@/components/ResourceCard";

interface ListPageProps {
  endpoint: string;
  title: string;
  resourceName: string;
}

export default function ListPage({
  endpoint,
  title,
  resourceName,
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
        <div className="text-gray-600">Loading {resourceName}s...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <p className="text-red-800">Error: {error}</p>
      </div>
    );
  }

  const capitalizedResourceName =
    resourceName.charAt(0).toUpperCase() + resourceName.slice(1);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
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
        <p className="text-gray-600">No {resourceName}s found</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <ResourceCard
              key={item.id}
              id={item.id}
              name={item.name}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
