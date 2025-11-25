import { useEffect, useState } from "react";
import { fetchResources, createResource, deleteResource } from "@/lib/api";

interface Resource {
  id: number;
  name: string;
}

export function useResourceList(endpoint: string, resourceName: string) {
  const [items, setItems] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchResources(endpoint);
        setItems(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  const handleDelete = async (id: number) => {
    if (!confirm(`Are you sure you want to delete this ${resourceName}?`)) {
      return;
    }

    try {
      await deleteResource(endpoint, id);
      setItems(items.filter((item) => item.id !== id));
    } catch (err) {
      alert(
        err instanceof Error ? err.message : `Failed to delete ${resourceName}`
      );
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newItemName.trim()) {
      alert(`Please enter a ${resourceName} name`);
      return;
    }

    try {
      setSubmitting(true);
      const newItem = await createResource(endpoint, newItemName.trim());
      setItems([...items, newItem]);

      // Reset form
      setNewItemName("");
      setShowAddForm(false);
    } catch (err) {
      alert(
        err instanceof Error ? err.message : `Failed to add ${resourceName}`
      );
    } finally {
      setSubmitting(false);
    }
  };

  return {
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
  };
}
