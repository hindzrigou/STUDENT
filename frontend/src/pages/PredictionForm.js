import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

function PredictionForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    Sommeil: "",
    Cours: "",
    Humeur: "",
    Sport: "Non",
    Meteo: "Soleil",
  });
  const [showResultFlag, setShowResultFlag] = useState(false);
  const [prediction, setPrediction] = useState("");
  const navigate = useNavigate();

  const steps = [
    {
      id: "Sommeil",
      question: "How many hours did you sleep?",
      type: "number",
    },
    {
      id: "Cours",
      question: "How many classes do you have today?",
      type: "number",
    },
    {
      id: "Humeur",
      question: "How do you rate your mood? (1-5)",
      type: "number",
    },
    {
      id: "Sport",
      question: "Did you do any sport today?",
      type: "select",
      options: [
        { value: "Oui", label: "Yes" },
        { value: "Non", label: "No" },
      ],
    },
    {
      id: "Meteo",
      question: "What's the weather like?",
      type: "select",
      options: [
        { value: "Soleil", label: "Sunny" },
        { value: "Nuageux", label: "Cloudy" },
        { value: "Pluie", label: "Rainy" },
      ],
    },
  ];
  const step = steps[currentStep];

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function nextQuestion() {
    setCurrentStep((prev) => prev + 1);
  }

  async function showResult() {
    // Validation des valeurs
    const sommeil = parseFloat(formData.Sommeil);
    const cours = parseInt(formData.Cours);
    const humeur = parseInt(formData.Humeur);
    const sport = formData.Sport;
    const meteo = formData.Meteo;

    if (isNaN(sommeil) || sommeil < 0 || sommeil > 24) {
      setShowResultFlag(true);
      setPrediction(
        "Erreur : Le nombre d'heures de sommeil doit être entre 0 et 24. Veuillez recommencer."
      );
      return;
    }
    if (isNaN(cours) || cours < 0 || cours > 20) {
      setShowResultFlag(true);
      setPrediction(
        "Erreur : Le nombre de cours doit être entre 0 et 20. Veuillez recommencer."
      );
      return;
    }
    if (isNaN(humeur) || humeur < 1 || humeur > 5) {
      setShowResultFlag(true);
      setPrediction(
        "Erreur : L'humeur doit être un nombre entre 1 et 5. Veuillez recommencer."
      );
      return;
    }
    if (!["Oui", "Non"].includes(sport)) {
      setShowResultFlag(true);
      setPrediction(
        "Erreur : La valeur du champ sport est invalide. Veuillez recommencer."
      );
      return;
    }
    if (!["Soleil", "Nuageux", "Pluie"].includes(meteo)) {
      setShowResultFlag(true);
      setPrediction(
        "Erreur : La valeur du champ météo est invalide. Veuillez recommencer."
      );
      return;
    }

    setShowResultFlag(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.prediction) {
        setPrediction(data.prediction);
      } else if (data.error) {
        setPrediction("Erreur: " + data.error);
      } else {
        setPrediction("Aucune prédiction reçue.");
      }
    } catch (err) {
      setPrediction("Erreur de connexion au backend.");
    }
  }

  return (
    <div
      className="bg-image"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="body"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontFamily: "Arial, sans-serif",
              maxWidth: "400px",
              textAlign: "center",
              padding: "30px",
              borderRadius: "15px",
              background: "rgba(13, 71, 161, 0.8)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              color: "#ffffff",
              marginRight: "40px",
            }}
          >
            <h1
              style={{
                fontSize: "22px",
                marginBottom: "20px",
                color: "#b3e5fc",
              }}
            >
              Productivity Quiz
            </h1>
            {!showResultFlag ? (
              <div key={step.id}>
                <p style={{ fontSize: "18px", marginBottom: "15px" }}>
                  {step.question}
                </p>
                {step.type === "select" ? (
                  <select
                    className="quiz-input"
                    name={step.id}
                    value={formData[step.id]}
                    onChange={handleChange}
                  >
                    {step.options.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    className="quiz-input"
                    type="number"
                    name={step.id}
                    value={formData[step.id]}
                    onChange={handleChange}
                  />
                )}
                {currentStep < steps.length - 1 ? (
                  <button
                    onClick={nextQuestion}
                    style={{
                      backgroundColor: "#b3e5fc",
                      color: "#0d47a1",
                      padding: "12px 20px",
                      border: "none",
                      borderRadius: "10px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      fontSize: "16px",
                      transition: "0.3s",
                    }}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={showResult}
                    style={{
                      backgroundColor: "#b3e5fc",
                      color: "#0d47a1",
                      padding: "12px 20px",
                      border: "none",
                      borderRadius: "10px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      fontSize: "16px",
                      transition: "0.3s",
                    }}
                  >
                    Show Result
                  </button>
                )}
              </div>
            ) : (
              <div>
                <p
                  style={{
                    fontSize: "20px",
                    marginTop: "20px",
                    fontWeight: "bold",
                    color:
                      typeof prediction === "string" &&
                      prediction.startsWith("Erreur")
                        ? "#fc575e"
                        : undefined,
                  }}
                >
                  {Array.isArray(prediction)
                    ? prediction.join(" ")
                    : prediction}
                </p>
                {typeof prediction === "string" &&
                  prediction.startsWith("Erreur") && (
                    <button
                      className="quiz-btn restart"
                      onClick={() => {
                        setShowResultFlag(false);
                        setFormData({
                          Sommeil: "",
                          Cours: "",
                          Humeur: "",
                          Sport: "Non",
                          Meteo: "Soleil",
                        });
                        setCurrentStep(0);
                        setPrediction("");
                      }}
                    >
                      Recommencer
                    </button>
                  )}
              </div>
            )}
          </div>
          <div className="side-buttons">
            <button className="big-btn" onClick={() => navigate("/history")}>
              {" "}
              <span className="icon" role="img" aria-label="history">
                📋
              </span>{" "}
              History
            </button>
            <button className="big-btn" onClick={() => navigate("/dashboard")}>
              {" "}
              <span className="icon" role="img" aria-label="dashboard">
                📊
              </span>{" "}
              Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PredictionForm;
