import { useEffect, useState } from "react";
import { API_URL } from "@/config/env";

interface Protein {
  id: number;
  name: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  timestamp: string;
  data: Protein[];
}

export default function ProteinList() {
  const [proteins, setProteins] = useState<Protein[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProteinName, setNewProteinName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchProteins = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/protein`);

        if (!response.ok) {
          throw new Error("Failed to fetch proteins");
        }

        const result: ApiResponse = await response.json();

        if (result.success) {
          setProteins(result.data);
        } else {
          throw new Error(result.message);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProteins();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this protein?")) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/protein/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete protein");
      }

      // Remove the deleted protein from the list
      setProteins(proteins.filter((protein) => protein.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete protein");
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newProteinName.trim()) {
      alert("Please enter a protein name");
      return;
    }

    try {
      setSubmitting(true);
      const response = await fetch(`${API_URL}/protein`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newProteinName.trim() }),
      });

      if (!response.ok) {
        throw new Error("Failed to add protein");
      }

      const result = await response.json();

      // Add the new protein to the list
      if (result.success && result.data) {
        setProteins([...proteins, result.data]);
      }

      // Reset form
      setNewProteinName("");
      setShowAddForm(false);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to add protein");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-600">Loading proteins...</div>
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

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Proteins</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {showAddForm ? "Cancel" : "Add Protein"}
        </button>
      </div>

      {showAddForm && (
        <form
          onSubmit={handleAdd}
          className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200"
        >
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <label
                htmlFor="proteinName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Protein Name
              </label>
              <input
                id="proteinName"
                type="text"
                value={newProteinName}
                onChange={(e) => setNewProteinName(e.target.value)}
                placeholder="Enter protein name"
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
      )}

      {proteins.length === 0 ? (
        <p className="text-gray-600">No proteins found</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {proteins.map((protein) => (
            <div
              key={protein.id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 capitalize">
                    {protein.name}
                  </h3>
                  <span className="text-sm text-gray-500">
                    ID: {protein.id}
                  </span>
                </div>
                <button
                  onClick={() => handleDelete(protein.id)}
                  className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
