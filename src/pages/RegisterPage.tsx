import RegisterForm from "@/components/RegisterForm";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();

  const handleRegisterSuccess = () => {
    alert("Registration successful!");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
      <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
    </div>
  );
}
