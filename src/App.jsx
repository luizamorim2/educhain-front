import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import "./assets/css/App.css";

import HomePage from "./homePage";
import { CertificatePage } from "./Certificate";
import RegisterInstitution from "./registerInstitution";
import RegisterCertificate from "./registerCertificate";
import Login from "./login";
import CheckPage from "./checkPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/registerInstitution" element={<RegisterInstitution />} />
        <Route path="/registerCertificate" element={<RegisterCertificate />} />
        <Route path="/login" element={<Login />} />
        <Route path="/certificate" element={<CheckPage />} />
        <Route path="/certificate/:hash" element={<CertificatePage />} />
        
        {/* Rota coringa para redirecionar para a home page */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
