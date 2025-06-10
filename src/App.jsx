import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EcoSight from './pages/EcoSight';
import EcoActive from './pages/EcoActive';
import EcoQuest from './pages/EcoQuest';
import Leaderboard from "./pages/Leaderboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/EcoSight" element={<EcoSight/>} />
        <Route path="/EcoActive" element={<EcoActive />} />
        <Route path="/EcoQuest" element={<EcoQuest />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
}

export default App;
