import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import YouTubeConnectedPage from "./components/YouTubeConnectedPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/youtube-connected" element={<YouTubeConnectedPage />} />
      </Routes>
    </Router>
  );
}

export default App;
