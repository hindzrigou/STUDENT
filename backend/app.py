# app.py
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

    # Créer un DataFrame avec les données reçues
    df = pd.DataFrame([data])

    # Convertir les colonnes catégorielles en numériques comme à l'entraînement
    df = pd.get_dummies(df, columns=["Sport", "Meteo"], drop_first=True)

    # Ajouter les colonnes manquantes avec 0
    for col in model.feature_names_in_:
        if col not in df.columns:
            df[col] = 0

    # Faire la prédiction
    prediction = model.predict(df).tolist()
    return jsonify({"prediction": prediction})

if __name__ == "__main__":
    print("🟢 Backend démarré !")
    app.run(debug=True)
