import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import SaaSMainPage from "./components/SaaSMainPage"; // nueva página donde irá todo el SaaS

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/saas-main" element={<SaaSMainPage />} />
        {/* Puedes agregar más rutas como /upload o disclaimers en el futuro */}
      </Routes>
    </Router>
  );
}

export default App;
