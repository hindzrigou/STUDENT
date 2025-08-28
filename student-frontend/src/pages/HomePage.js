import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Bienvenue sur SmartDay 🚀</h1>
      <p>Votre plateforme de prédiction de productivité</p>
      <Link to="/prediction">
        <button style={{ marginTop: "20px", padding: "10px 20px", cursor: "pointer" }}>
          Commencer le Quiz
        </button>
      </Link>
    </div>
  );
}

export default HomePage;
