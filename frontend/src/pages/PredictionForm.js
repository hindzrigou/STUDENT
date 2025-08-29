import React, { useState } from "react";

function PredictionForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    Sommeil: "",
    Cours: "",
    Humeur: "",
    Sport: "Non", // Keep value as "Oui"/"Non" for backend compatibility
    Meteo: "Soleil", // Keep value as "Soleil"/"Nuageux"/"Pluie" for backend compatibility
  });
  const [showResultFlag, setShowResultFlag] = useState(false);
  const [prediction, setPrediction] = useState("");

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
        body: JSON.stringify(formData), // envoie les champs corrects
      });
      const data = await response.json();
      setPrediction(data.prediction[0]); // get prediction
      setShowResultFlag(true);
    } catch (error) {
      console.error("Prediction error:", error);
      setPrediction("Prediction error");
      setShowResultFlag(true);
    }
  };

  return (
    <div className="body">
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          maxWidth: "400px",
          margin: "50px auto",
          textAlign: "center",
          padding: "30px",
          borderRadius: "15px",
          background: "rgba(13, 71, 161, 0.8)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          color: "#ffffff",
        }}
      >
        <h1
          style={{ fontSize: "22px", marginBottom: "20px", color: "#b3e5fc" }}
        >
          Productivity Quiz
        </h1>
        {!showResultFlag ? (
          <div>
            {steps.map(
              (step, index) =>
                index === currentStep && (
                  <div key={step.id}>
                    <p style={{ fontSize: "18px", marginBottom: "15px" }}>
                      {step.question}
                    </p>
                    {step.type === "select" ? (
                      <select
                        name={step.id}
                        value={formData[step.id]}
                        onChange={handleChange}
                        style={{
                          padding: "10px",
                          fontSize: "16px",
                          width: "90%",
                          marginBottom: "20px",
                          borderRadius: "8px",
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
                          padding: "10px",
                          fontSize: "16px",
                          width: "90%",
                          marginBottom: "20px",
                          borderRadius: "8px",
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
                )
            )}
          </div>
        ) : (
          <div>
            <p
              style={{
                fontSize: "20px",
                marginTop: "20px",
                fontWeight: "bold",
              }}
            >
              Prediction: {prediction}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PredictionForm;
