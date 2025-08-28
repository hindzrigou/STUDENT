// PredictionForm.js
import React, { useState } from "react";

function PredictionForm() {
  const [formData, setFormData] = useState({
    Sommeil: "",
    Cours: "",
    Humeur: "",
    Sport: "Oui",
    Meteo: "Soleil"
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Sommeil: parseFloat(formData.Sommeil),
          Cours: parseFloat(formData.Cours),
          Humeur: parseFloat(formData.Humeur),
          Sport: formData.Sport,
          Meteo: formData.Meteo
        })
      });

      const data = await response.json();

      if (data.prediction) {
        setPrediction(data.prediction[0]);
        setError(null);
      } else {
        setPrediction(null);
        setError("Erreur : le backend n'a pas renvoyé de prédiction");
      }
    } catch (err) {
      setPrediction(null);
      setError("Erreur de connexion au serveur");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto", textAlign: "center" }}>
      <h2>Prédiction de productivité</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <input type="number" name="Sommeil" placeholder="Heures de sommeil" value={formData.Sommeil} onChange={handleChange} required />
        <input type="number" name="Cours" placeholder="Nombre de cours" value={formData.Cours} onChange={handleChange} required />
        <input type="number" name="Humeur" placeholder="Humeur (1-5)" value={formData.Humeur} onChange={handleChange} required />
        <select name="Sport" value={formData.Sport} onChange={handleChange}>
          <option value="Oui">Oui</option>
          <option value="Non">Non</option>
        </select>
        <select name="Meteo" value={formData.Meteo} onChange={handleChange}>
          <option value="Soleil">Soleil</option>
          <option value="Pluie">Pluie</option>
          <option value="Nuage">Nuage</option>
        </select>
        <button type="submit" style={{ padding: "10px", cursor: "pointer" }}>Prédire</button>
      </form>

      {prediction !== null && (
        <div style={{ marginTop: "20px", fontSize: "18px", fontWeight: "bold" }}>
          Productivité estimée : {prediction === 1 ? "✅ Productif" : "❌ Pas productif"}
        </div>
      )}

      {error && (
        <div style={{ marginTop: "20px", color: "red", fontWeight: "bold" }}>{error}</div>
      )}
    </div>
  );
}

export default PredictionForm;
