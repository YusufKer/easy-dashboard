import { useState } from "react";
import FlavourCard from "@/components/FlavourCard";

interface Flavour {
  id: number;
  name: string;
  price: string;
}

interface AvailableFlavour {
  id: number;
  name: string;
}

interface FlavoursSectionProps {
  proteinId: string;
  flavours: Flavour[];
  availableFlavours: AvailableFlavour[];
  onAddFlavour: (flavourId: number, price: string) => Promise<void>;
  onUpdateFlavour: (flavourId: number, newPrice: string) => Promise<void>;
  onDeleteFlavour: (flavourId: number) => Promise<void>;
  deletingFlavourId: number | null;
  updatingFlavourId: number | null;
}

export default function FlavoursSection({
  flavours,
  availableFlavours,
  onAddFlavour,
  onUpdateFlavour,
  onDeleteFlavour,
  deletingFlavourId,
  updatingFlavourId,
}: FlavoursSectionProps) {
  const [selectedFlavourId, setSelectedFlavourId] = useState<string>("");
  const [flavourPrice, setFlavourPrice] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  const handleAddFlavour = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFlavourId || !flavourPrice) {
      return;
    }

    try {
      setSubmitting(true);
      await onAddFlavour(parseInt(selectedFlavourId), flavourPrice);

      // Reset form
      setSelectedFlavourId("");
      setFlavourPrice("");
    } catch {
      // Error handling is done in parent
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
        Flavours
      </h2>

      {/* Add Flavour Form */}
      <form
        onSubmit={handleAddFlavour}
        className="mb-6 bg-slate-50 p-5 rounded-xl border border-slate-200"
      >
        <div className="flex gap-3 items-end">
          <div className="flex-1">
            <label
              htmlFor="flavourSelect"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Select Flavour
            </label>
            <select
              id="flavourSelect"
              value={selectedFlavourId}
              onChange={(e) => setSelectedFlavourId(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              disabled={submitting}
              required
            >
              <option value="">Choose a flavour</option>
              {availableFlavours.map((flavour) => (
                <option key={flavour.id} value={flavour.id}>
                  {flavour.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label
              htmlFor="flavourPrice"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Price
            </label>
            <input
              id="flavourPrice"
              type="number"
              step="0.01"
              value={flavourPrice}
              onChange={(e) => setFlavourPrice(e.target.value)}
              placeholder="Enter price"
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              disabled={submitting}
              required
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

      {flavours.length === 0 ? (
        <p className="text-slate-500">No flavours available</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {flavours.map((flavour) => (
            <FlavourCard
              key={flavour.id}
              flavour={flavour}
              onUpdate={onUpdateFlavour}
              onDelete={onDeleteFlavour}
              isDeleting={deletingFlavourId === flavour.id}
              isUpdating={updatingFlavourId === flavour.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
