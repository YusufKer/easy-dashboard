import LoginForm from "@/components/LoginForm";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  email: string;
  role: string;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLoginSuccess = (accessToken: string, user: User) => {
    console.log("Login successful:", { accessToken, user });
    navigate("/protein");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </div>
  );
}
