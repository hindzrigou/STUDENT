import React, { useState } from "react";

function PredictionForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    sleep: "",
    courses: "",
    study: "",
    breaks: "",
    mood: "good",
  });
  const [showResultFlag, setShowResultFlag] = useState(false);
  const [scoreResult, setScoreResult] = useState({ message: "", emoji: "" });

  const steps = [
    { id: "sleep", question: "Combien d'heures as-tu dormi ?", type: "number" },
    {
      id: "courses",
      question: "Combien de cours as-tu aujourd'hui ?",
      type: "number",
    },
    {
      id: "study",
      question: "Combien d'heures d'étude perso ?",
      type: "number",
    },
    { id: "breaks", question: "Combien de pauses prends-tu ?", type: "number" },
    {
      id: "mood",
      question: "Comment est ton humeur ?",
      type: "select",
      options: [
        { value: "good", label: "😊 Bonne" },
        { value: "neutral", label: "😐 Moyenne" },
        { value: "bad", label: "😞 Mauvaise" },
      ],
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const nextQuestion = () => setCurrentStep((prev) => prev + 1);

  // ✅ Nouveau showResult : appel au backend
  const showResult = async () => {
    try {
      // Préparer les données à envoyer au backend
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Par exemple, on utilise 'study' comme heures de révision
        body: JSON.stringify({
          heures_revision: parseFloat(formData.study) || 0,
        }),
      });

      const data = await response.json();

      if (data.prediction) {
        // Transformer la prédiction en message et emoji
        let message = "";
        let emoji = "";
        const score = data.prediction[0];
        if (score >= 70) {
          message = "Tu es productive aujourd'hui 🎉";
          emoji = "✨";
        } else if (score >= 40) {
          message = "Ta productivité est moyenne ⚖️";
          emoji = "🙂";
        } else {
          message = "Pas très productif aujourd'hui...";
          emoji = "😴";
        }

        setScoreResult({ message, emoji });
      } else {
        setScoreResult({ message: "Erreur dans la prédiction", emoji: "⚠️" });
      }

      setShowResultFlag(true);
    } catch (error) {
      setScoreResult({
        message: "Erreur de connexion au serveur",
        emoji: "⚠️",
      });
      setShowResultFlag(true);
    }
  };

  return (
    <div className="body">
      <div
        className="container"
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
          Quiz de Productivité
        </h1>
        {!showResultFlag ? (
          <div id="quiz">
            {steps.map(
              (step, index) =>
                index === currentStep && (
                  <div key={step.id} className="question-step">
                    <p
                      className="question"
                      style={{ fontSize: "18px", marginBottom: "15px" }}
                    >
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
                          outline: "none",
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
                        min={0}
                        max={24}
                        value={formData[step.id]}
                        onChange={handleChange}
                        style={{
                          padding: "10px",
                          fontSize: "16px",
                          width: "90%",
                          marginBottom: "20px",
                          borderRadius: "8px",
                          border: "none",
                          outline: "none",
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
                        Suivant
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
                        Voir le résultat
                      </button>
                    )}
                  </div>
                )
            )}
          </div>
        ) : (
          <div id="result">
            <p
              className="result"
              style={{
                fontSize: "20px",
                marginTop: "20px",
                fontWeight: "bold",
              }}
            >
              {scoreResult.message}
            </p>
            <p
              className="emoji"
              style={{ fontSize: "40px", marginTop: "15px" }}
            >
              {scoreResult.emoji}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PredictionForm;
