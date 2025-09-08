import React, { useState } from "react";
import background from "./assets/background.png"; 
import illustration from "./assets/illustration.png"; 

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

  const steps = [
    { id: "Sommeil", question: "How many hours did you sleep?", type: "number" },
    { id: "Cours", question: "How many classes do you have today?", type: "number" },
    { id: "Humeur", question: "How do you rate your mood? (1-5)", type: "number" },
    {
      id: "Sport",
      question: "Did you do any sport?",
      type: "select",
      options: [
        { value: "Oui", label: "Yes" },
        { value: "Non", label: "No" },
      ],
    },
    {
      id: "Meteo",
      question: "What is the weather like today?",
      type: "select",
      options: [
        { value: "Soleil", label: "Sunny" },
        { value: "Nuageux", label: "Cloudy" },
        { value: "Pluie", label: "Rainy" },
      ],
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const nextQuestion = () => setCurrentStep((prev) => prev + 1);

  const showResult = async () => {
    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setPrediction(data.prediction[0]);
      setShowResultFlag(true);
    } catch (error) {
      console.error("Prediction error:", error);
      setPrediction("Prediction error");
      setShowResultFlag(true);
    }
  };

  return (
    <div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    padding: "20px",
    boxSizing: "border-box",
  }}
>
  {/* Conteneur principal centré */}
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "40px",
      position: "relative",
    }}
  >
    {/* Illustration derrière */}
    <img
      src={illustration}
      alt="illustration"
      style={{
        position: "absolute",
        left: "-599px",
        top: "50%",
        transform: "translateY(-50%)",
        width: "855px",
        height: "auto",
        zIndex: 0,
        opacity: 0.95,
      }}
    />

    {/* Formulaire */}
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        width: "750px",
        textAlign: "center",
        padding: "50px",
        borderRadius: "25px",
        background: "rgba(9, 54, 123, 0.95)",
        boxShadow: "0 8px 20px rgba(0,0,0,0.35)",
        color: "#ffffff",
        zIndex: 1,
        position: "relative",
      }}
    >
      <h1 style={{ fontSize: "30px", marginBottom: "30px", color: "#b3e5fc" }}>
        Productivity Quiz
      </h1>

      {!showResultFlag ? (
        <div>
          {steps.map(
            (step, index) =>
              index === currentStep && (
                <div key={step.id}>
                  <p style={{ fontSize: "22px", marginBottom: "25px" }}>
                    {step.question}
                  </p>
                  {step.type === "select" ? (
                    <select
                      name={step.id}
                      value={formData[step.id]}
                      onChange={handleChange}
                      style={{
                        padding: "14px",
                        fontSize: "20px",
                        width: "95%",
                        marginBottom: "30px",
                        borderRadius: "12px",
                        border: "none",
                      }}
                    >
                      {step.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="number"
                      name={step.id}
                      value={formData[step.id]}
                      onChange={handleChange}
                      style={{
                        padding: "14px",
                        fontSize: "20px",
                        width: "95%",
                        marginBottom: "30px",
                        borderRadius: "12px",
                        border: "none",
                      }}
                    />
                  )}

                  {currentStep < steps.length - 1 ? (
                    <button
                      onClick={nextQuestion}
                      style={{
                        backgroundColor: "#b3e5fc",
                        color: "#0d47a1",
                        padding: "16px 28px",
                        border: "none",
                        borderRadius: "14px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        fontSize: "20px",
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
                        padding: "16px 28px",
                        border: "none",
                        borderRadius: "14px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        fontSize: "20px",
                      }}
                    >
                      Show Result
                    </button>
                  )}
                </div>
              )
          )}
        </div>
      ) : (
        <div>
          <p style={{ fontSize: "24px", marginTop: "30px", fontWeight: "bold" }}>
            Prediction: {prediction}
          </p>
        </div>
      )}
    </div>

    {/* Boutons */}
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "25px",
        zIndex: 2,
      }}
    >
      <button
        style={{
          backgroundColor: "#0a357d",
          color: "#ffffff",
          padding: "18px 30px",
          border: "none",
          borderRadius: "14px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "20px",
          width: "220px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        📊 Dashboard
      </button>

      <button
        style={{
          backgroundColor: "#0a357d",
          color: "#ffffff",
          padding: "18px 30px",
          border: "none",
          borderRadius: "14px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "20px",
          width: "220px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        📜 History
      </button>
    </div>
  </div>
</div>

  );
}

export default PredictionForm;
