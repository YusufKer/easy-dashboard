import { useState } from "react";

interface CutCardProps {
  cut: {
    id: number;
    name: string;
    price: string;
  };
  onUpdate: (cutId: number, newPrice: string) => Promise<void>;
  onDelete: (cutId: number) => Promise<void>;
  isDeleting: boolean;
  isUpdating: boolean;
}

export default function CutCard({
  cut,
  onUpdate,
  onDelete,
  isDeleting,
  isUpdating,
}: CutCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newPrice, setNewPrice] = useState(cut.price);

  const handleSave = async () => {
    await onUpdate(cut.id, newPrice);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewPrice(cut.price);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setNewPrice(cut.price);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition-all hover:border-indigo-200 flex flex-col gap-2">
      <small>{cut.id}</small>
      <h3 className="font-semibold text-slate-900 capitalize">{cut.name}</h3>
      {isEditing ? (
        <div className="flex gap-2 items-center mt-2">
          <input
            type="number"
            step="0.01"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            placeholder="New price"
            className="flex-1 px-2 py-1 text-sm border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={isUpdating}
          />
          <button
            className="px-2 py-1 bg-emerald-500 text-white rounded hover:bg-emerald-600 text-xs disabled:opacity-50"
            onClick={handleSave}
            disabled={isUpdating}
          >
            {isUpdating ? "Saving..." : "Save"}
          </button>
          <button
            className="px-2 py-1 bg-slate-400 text-white rounded hover:bg-slate-500 text-xs"
            onClick={handleCancel}
            disabled={isUpdating}
          >
            Cancel
          </button>
        </div>
      ) : (
        <p className="text-sm text-emerald-600 font-semibold mt-2">
          ${cut.price}
        </p>
      )}
      <div className="flex gap-2 mt-2">
        {!isEditing && (
          <button
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs disabled:opacity-50"
            onClick={handleEdit}
            disabled={isDeleting}
          >
            Update Price
          </button>
        )}
        <button
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs disabled:opacity-50"
          onClick={() => onDelete(cut.id)}
          disabled={isDeleting || isEditing}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}
