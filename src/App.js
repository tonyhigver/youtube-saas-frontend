import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import UploadDisclaimerPage from "./components/UploadDisclaimerPage"; // nueva página

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/upload-disclaimer" element={<UploadDisclaimerPage />} />
        {/* Puedes agregar más rutas como /upload en el futuro */}
      </Routes>
    </Router>
  );
}

export default App;
