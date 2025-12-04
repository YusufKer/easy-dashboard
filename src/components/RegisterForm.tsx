import { useState } from "react";

interface RegisterFormProps {
  onRegisterSuccess?: () => void;
}

export default function RegisterForm({ onRegisterSuccess }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setSubmitting(true);

    try {
      const { registerUser } = await import("@/lib/api");
      await registerUser({
        email: formData.email,
        password: formData.password,
      });

      // Clear form on success
      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
      });

      if (onRegisterSuccess) {
        onRegisterSuccess();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to register");
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
          Create Account
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Enter email"
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              disabled={submitting}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              disabled={submitting}
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              placeholder="Confirm password"
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              disabled={submitting}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all disabled:bg-slate-400 disabled:cursor-not-allowed font-medium shadow-sm hover:shadow mt-6"
          >
            {submitting ? "Creating Account..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
