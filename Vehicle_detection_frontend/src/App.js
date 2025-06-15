// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login"; // Coming next
import ZonePage from "./pages/ZonePage"; // Coming next
import ZoneDetailPage from "./pages/ZoneDetailPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/zone" element={<ZonePage />} />
        <Route path="/zone/:id" element={<ZoneDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
