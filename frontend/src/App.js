import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/layout";
import Accueil from "./pages/Acceuil";
import PredictionForm from "./pages/PredictionForm";
import HistoryTable from "./pages/history";
import DescriptionPage from "./pages/DescriptionPage"; 
import TodoList from "./pages/TodoList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Accueil />} />
          <Route path="prediction" element={<PredictionForm />} />
          <Route path="history" element={<HistoryTable />} />
          <Route path="description" element={<DescriptionPage />} /> 
          <Route path="todolist" element={<TodoList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
