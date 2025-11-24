import { useState } from "react";
import ProteinList from "@/components/ProteinList";

type NavOption = "protein" | "cuts" | "flavours";

export default function Layout() {
  const [activeTab, setActiveTab] = useState<NavOption>("protein");

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab("protein")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "protein"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Protein
              </button>
              <button
                onClick={() => setActiveTab("cuts")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "cuts"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Cuts
              </button>
              <button
                onClick={() => setActiveTab("flavours")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "flavours"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Flavours
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          {activeTab === "protein" && <ProteinList />}
          {activeTab === "cuts" && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Cuts
              </h2>
              <p className="text-gray-600">
                Content for cuts will be displayed here
              </p>
            </div>
          )}
          {activeTab === "flavours" && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Flavours
              </h2>
              <p className="text-gray-600">
                Content for flavours will be displayed here
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
