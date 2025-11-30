import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  fetchResourceById,
  fetchResources,
  addFlavourToProtein,
  addCutToProtein,
  removeFlavourFromProtein,
  removeCutFromProtein,
  updateFlavourPrice,
  updateCutPrice,
} from "@/lib/api";
import CutsSection from "@/components/CutsSection";
import FlavoursSection from "@/components/FlavoursSection";

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
  const [deletingFlavourId, setDeletingFlavourId] = useState<number | null>(
    null
  );
  const [deletingCutId, setDeletingCutId] = useState<number | null>(null);
  const [availableCuts, setAvailableCuts] = useState<AvailableCut[]>([]);
  const [updatingFlavourId, setUpdatingFlavourId] = useState<number | null>(
    null
  );
  const [updatingCutId, setUpdatingCutId] = useState<number | null>(null);

  const handleDeleteCut = async (cutId: number) => {
    if (!id) return;
    setDeletingCutId(cutId);
    try {
      await removeCutFromProtein(id, cutId);
      setProtein((prev) =>
        prev ? { ...prev, cuts: prev.cuts.filter((c) => c.id !== cutId) } : prev
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete cut");
    } finally {
      setDeletingCutId(null);
    }
  };
  const handleDeleteFlavour = async (flavourId: number) => {
    if (!id) return;
    setDeletingFlavourId(flavourId);
    try {
      await removeFlavourFromProtein(id, flavourId);
      setProtein((prev) =>
        prev
          ? {
              ...prev,
              flavours: prev.flavours.filter((f) => f.id !== flavourId),
            }
          : prev
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete flavour");
    } finally {
      setDeletingFlavourId(null);
    }
  };

  const handleUpdateFlavourPrice = async (
    flavourId: number,
    newPrice: string
  ) => {
    if (!id || !newPrice) return;
    setUpdatingFlavourId(flavourId);
    try {
      await updateFlavourPrice(id, flavourId, newPrice);
      setProtein((prev) =>
        prev
          ? {
              ...prev,
              flavours: prev.flavours.map((f) =>
                f.id === flavourId ? { ...f, price: newPrice } : f
              ),
            }
          : prev
      );
    } catch (err) {
      alert(
        err instanceof Error ? err.message : "Failed to update flavour price"
      );
    } finally {
      setUpdatingFlavourId(null);
    }
  };

  const handleUpdateCutPrice = async (cutId: number, newPrice: string) => {
    if (!id || !newPrice) return;
    setUpdatingCutId(cutId);
    try {
      await updateCutPrice(id, cutId, newPrice);
      setProtein((prev) =>
        prev
          ? {
              ...prev,
              cuts: prev.cuts.map((c) =>
                c.id === cutId ? { ...c, price: newPrice } : c
              ),
            }
          : prev
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to update cut price");
    } finally {
      setUpdatingCutId(null);
    }
  };

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

  const handleAddFlavour = async (flavourId: number, price: string) => {
    if (!id) return;

    await addFlavourToProtein(id, flavourId, price);

    // Refresh protein data
    const updatedProtein = await fetchResourceById<ProteinDetail>(
      "protein",
      id
    );
    setProtein(updatedProtein);
  };

  const handleAddCut = async (cutId: number, price: string) => {
    if (!id) return;

    await addCutToProtein(id, cutId, price);

    // Refresh protein data
    const updatedProtein = await fetchResourceById<ProteinDetail>(
      "protein",
      id
    );
    setProtein(updatedProtein);
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
          <CutsSection
            proteinId={id!}
            cuts={protein.cuts}
            availableCuts={availableCuts}
            onAddCut={handleAddCut}
            onUpdateCut={handleUpdateCutPrice}
            onDeleteCut={handleDeleteCut}
            deletingCutId={deletingCutId}
            updatingCutId={updatingCutId}
          />

          {/* Flavours Section */}
          <FlavoursSection
            proteinId={id!}
            flavours={protein.flavours}
            availableFlavours={availableFlavours}
            onAddFlavour={handleAddFlavour}
            onUpdateFlavour={handleUpdateFlavourPrice}
            onDeleteFlavour={handleDeleteFlavour}
            deletingFlavourId={deletingFlavourId}
            updatingFlavourId={updatingFlavourId}
          />
        </div>
      </div>
    </div>
  );
}
