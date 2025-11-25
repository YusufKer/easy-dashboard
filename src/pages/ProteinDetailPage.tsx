import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchResourceById } from "@/lib/api";

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

export default function ProteinDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [protein, setProtein] = useState<ProteinDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

      <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-xl border border-slate-200 p-8">
        <h1 className="text-3xl font-bold text-slate-900 capitalize mb-8">
          {protein.name}
        </h1>

        <div className="space-y-8">
          {/* Cuts Section */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
              Cuts
            </h2>
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
