import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Acceuil from "./pages/Acceuil";
import PredictionForm from "./pages/PredictionForm";
import Dashboard from "./pages/Dashboard";
import Layout from "./pages/layout"; // ✅ importe ton Layout
import HistoryTable from "./pages/history";
import DescriptionPage from "./pages/DescriptionPage"; 
import TodoList from "./pages/TodoList";

function App() {
  return (
    <Router>
      <Routes>
        {/* Toutes les routes sont "enveloppées" par Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Acceuil />} /> {/* page d'accueil */}
          <Route path="prediction" element={<PredictionForm />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="history" element={<HistoryTable />} />
          <Route path="description" element={<DescriptionPage />} /> 
          <Route path="todolist" element={<TodoList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
              