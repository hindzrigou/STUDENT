from flask import Flask, request, jsonify
import joblib
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Charger le modèle
model = joblib.load("model_productivity.pkl")

@app.route("/")
def home():
    return "✅ Backend Flask fonctionne bien !"

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    # Vérifier que les champs attendus sont présents
    expected_cols = ["Sommeil", "Cours", "Humeur", "Sport", "Meteo"]
    for col in expected_cols:
        if col not in data:
            return jsonify({"error": f"Colonne manquante: {col}"}), 400

    # Créer un DataFrame avec les données reçues
    df = pd.DataFrame([data])

    # Convertir les colonnes catégorielles
    df = pd.get_dummies(df, columns=["Sport", "Meteo"], drop_first=True)

    # Ajouter les colonnes manquantes avec 0
    for col in model.feature_names_in_:
        if col not in df.columns:
            df[col] = 0

    # Réorganiser les colonnes dans le bon ordre
    df = df[model.feature_names_in_]

    # Faire la prédiction
    prediction = model.predict(df).tolist()

    # Traduire les résultats en anglais
    translation = {
        "Excellente": "Excellent",
        "Bonne": "Good",
        "Moyenne": "Average",
        "Faible": "Low"
    }
    prediction_english = [translation.get(str(p), str(p)) for p in prediction]
    return jsonify({"prediction": prediction_english})

if __name__ == "__main__":
    print("🟢 Backend démarré !")
    app.run(debug=True)