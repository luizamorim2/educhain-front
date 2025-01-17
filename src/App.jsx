import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import "./assets/css/App.css";

import HomePage from "./Pages/HomePage/HomePage.jsx";
import { CertificatePage } from "./Pages/CertificatePage/Certificate.jsx";
import RegisterInstitution from "./Pages/RegisterInstitution/registerInstitution.jsx";
import RegisterCertificate from "./Pages/RegisterCertificatePage/registerCertificate.jsx";
import Login from "./Pages/LoginPage/login.jsx";
import CheckPage from "./Pages/CheckPage/checkPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/registerInstitution" element={<RegisterInstitution />} />
        <Route path="/login" element={<Login />} />
        <Route path="/certificate" element={<CheckPage />} />
        <Route path="/certificate/:hash" element={<CertificatePage />} />

        {}
        <Route
          path="/registerCertificate"
          element={<ProtectedRoute element={<RegisterCertificate />} />}
        />

        {}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
