import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  fetchResourceById,
  fetchResources,
  addFlavourToProtein,
  addCutToProtein,
} from "@/lib/api";

interface Cut {
  id: number;
  name: string;
  price: string;
}

interface Flavour {
  id: number;
  name: string;
  price: string;
}

interface ProteinDetail {
  id: number;
  name: string;
  cuts: Cut[];
  flavours: Flavour[];
}

interface AvailableFlavour {
  id: number;
  name: string;
}

interface AvailableCut {
  id: number;
  name: string;
}

export default function ProteinDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [protein, setProtein] = useState<ProteinDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [availableFlavours, setAvailableFlavours] = useState<
    AvailableFlavour[]
  >([]);
  const [selectedFlavourId, setSelectedFlavourId] = useState<string>("");
  const [flavourPrice, setFlavourPrice] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [availableCuts, setAvailableCuts] = useState<AvailableCut[]>([]);
  const [selectedCutId, setSelectedCutId] = useState<string>("");
  const [cutPrice, setCutPrice] = useState<string>("");
  const [submittingCut, setSubmittingCut] = useState(false);

  useEffect(() => {
    const fetchProtein = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const data = await fetchResourceById<ProteinDetail>("protein", id);
        setProtein(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProtein();
  }, [id]);

  useEffect(() => {
    const fetchFlavours = async () => {
      try {
        const data = await fetchResources("flavours");
        setAvailableFlavours(data);
      } catch (err) {
        console.error("Failed to fetch flavours:", err);
      }
    };

    fetchFlavours();
  }, []);

  useEffect(() => {
    const fetchCuts = async () => {
      try {
        const data = await fetchResources("cuts");
        setAvailableCuts(data);
      } catch (err) {
        console.error("Failed to fetch cuts:", err);
      }
    };

    fetchCuts();
  }, []);

  const handleAddFlavour = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id || !selectedFlavourId || !flavourPrice) {
      return;
    }

    try {
      setSubmitting(true);
      await addFlavourToProtein(id, parseInt(selectedFlavourId), flavourPrice);

      // Refresh protein data
      const updatedProtein = await fetchResourceById<ProteinDetail>(
        "protein",
        id
      );
      setProtein(updatedProtein);

      // Reset form
      setSelectedFlavourId("");
      setFlavourPrice("");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to add flavour");
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddCut = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id || !selectedCutId || !cutPrice) {
      return;
    }

    try {
      setSubmittingCut(true);
      await addCutToProtein(id, parseInt(selectedCutId), cutPrice);

      // Refresh protein data
      const updatedProtein = await fetchResourceById<ProteinDetail>(
        "protein",
        id
      );
      setProtein(updatedProtein);

      // Reset form
      setSelectedCutId("");
      setCutPrice("");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to add cut");
    } finally {
      setSubmittingCut(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-slate-600">Loading protein details...</div>
      </div>
    );
  }

  if (error || !protein) {
    return (
      <div>
        <Link
          to="/protein"
          className="inline-flex items-center gap-2 mb-6 text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
        >
          ← Back to Proteins
        </Link>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-900 font-medium">
            Error: {error || "Protein not found"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Link
        to="/protein"
        className="inline-flex items-center gap-2 mb-6 text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
      >
        ← Back to Proteins
      </Link>

      <div className="bg-linear-to-br from-slate-50 to-slate-100/50 rounded-xl border border-slate-200 p-8">
        <h1 className="text-3xl font-bold text-slate-900 capitalize mb-8">
          {protein.name}
        </h1>

        <div className="space-y-8">
          {/* Cuts Section */}
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
                    disabled={submittingCut}
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
                    disabled={submittingCut}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={submittingCut}
                  className="px-5 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all disabled:bg-slate-400 disabled:cursor-not-allowed font-medium shadow-sm hover:shadow"
                >
                  {submittingCut ? "Adding..." : "Add"}
                </button>
              </div>
            </form>

            {protein.cuts.length === 0 ? (
              <p className="text-slate-500">No cuts available</p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {protein.cuts.map((cut) => (
                  <div
                    key={cut.id}
                    className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition-all hover:border-indigo-200"
                  >
                    <h3 className="font-semibold text-slate-900 capitalize">
                      {cut.name}
                    </h3>
                    <p className="text-sm text-emerald-600 font-semibold mt-2">
                      ${cut.price}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Flavours Section */}
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

            {protein.flavours.length === 0 ? (
              <p className="text-slate-500">No flavours available</p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {protein.flavours.map((flavour) => (
                  <div
                    key={flavour.id}
                    className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition-all hover:border-indigo-200"
                  >
                    <h3 className="font-semibold text-slate-900 capitalize">
                      {flavour.name}
                    </h3>
                    <p className="text-sm text-emerald-600 font-semibold mt-2">
                      ${flavour.price}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
