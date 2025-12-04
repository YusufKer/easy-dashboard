import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import ProteinPage from "@/pages/ProteinPage";
import ProteinDetailPage from "@/pages/ProteinDetailPage";
import CutsPage from "@/pages/CutsPage";
import FlavoursPage from "@/pages/FlavoursPage";
import RegisterPage from "@/pages/RegisterPage";
import LoginPage from "@/pages/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/protein" replace />} />
          <Route path="protein" element={<ProteinPage />} />
          <Route path="protein/:id" element={<ProteinDetailPage />} />
          <Route path="cuts" element={<CutsPage />} />
          <Route path="flavours" element={<FlavoursPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
