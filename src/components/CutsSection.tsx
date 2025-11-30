import { useState } from "react";
import CutCard from "@/components/CutCard";

interface Cut {
  id: number;
  name: string;
  price: string;
}

interface AvailableCut {
  id: number;
  name: string;
}

interface CutsSectionProps {
  proteinId: string;
  cuts: Cut[];
  availableCuts: AvailableCut[];
  onAddCut: (cutId: number, price: string) => Promise<void>;
  onUpdateCut: (cutId: number, newPrice: string) => Promise<void>;
  onDeleteCut: (cutId: number) => Promise<void>;
  deletingCutId: number | null;
  updatingCutId: number | null;
}

export default function CutsSection({
  cuts,
  availableCuts,
  onAddCut,
  onUpdateCut,
  onDeleteCut,
  deletingCutId,
  updatingCutId,
}: CutsSectionProps) {
  const [selectedCutId, setSelectedCutId] = useState<string>("");
  const [cutPrice, setCutPrice] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  const handleAddCut = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCutId || !cutPrice) {
      return;
    }

    try {
      setSubmitting(true);
      await onAddCut(parseInt(selectedCutId), cutPrice);

      // Reset form
      setSelectedCutId("");
      setCutPrice("");
    } catch {
      // Error handling is done in parent
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
        Cuts
      </h2>

      {/* Add Cut Form */}
      <form
        onSubmit={handleAddCut}
        className="mb-6 bg-slate-50 p-5 rounded-xl border border-slate-200"
      >
        <div className="flex gap-3 items-end">
          <div className="flex-1">
            <label
              htmlFor="cutSelect"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Select Cut
            </label>
            <select
              id="cutSelect"
              value={selectedCutId}
              onChange={(e) => setSelectedCutId(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              disabled={submitting}
              required
            >
              <option value="">Choose a cut</option>
              {availableCuts.map((cut) => (
                <option key={cut.id} value={cut.id}>
                  {cut.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label
              htmlFor="cutPrice"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Price
            </label>
            <input
              id="cutPrice"
              type="number"
              step="0.01"
              value={cutPrice}
              onChange={(e) => setCutPrice(e.target.value)}
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

      {cuts.length === 0 ? (
        <p className="text-slate-500">No cuts available</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cuts.map((cut) => (
            <CutCard
              key={cut.id}
              cut={cut}
              onUpdate={onUpdateCut}
              onDelete={onDeleteCut}
              isDeleting={deletingCutId === cut.id}
              isUpdating={updatingCutId === cut.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
