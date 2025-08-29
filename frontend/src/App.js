import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/layout";
import Accueil from "./pages/Acceuil";
import PredictionForm from "./pages/PredictionForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Accueil />} />
          <Route path="prediction" element={<PredictionForm />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
