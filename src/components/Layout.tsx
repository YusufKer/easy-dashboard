import { Link, Outlet, useLocation } from "react-router-dom";

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex space-x-4">
              <Link
                to="/protein"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === "/protein"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Protein
              </Link>
              <Link
                to="/cuts"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === "/cuts"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Cuts
              </Link>
              <Link
                to="/flavours"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === "/flavours"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Flavours
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
