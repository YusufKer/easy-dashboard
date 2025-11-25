import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import ProteinPage from "@/pages/ProteinPage";
import CutsPage from "@/pages/CutsPage";
import FlavoursPage from "@/pages/FlavoursPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/protein" replace />} />
          <Route path="protein" element={<ProteinPage />} />
          <Route path="cuts" element={<CutsPage />} />
          <Route path="flavours" element={<FlavoursPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
