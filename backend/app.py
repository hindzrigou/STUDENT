import datetime
import csv
import os

HISTORY_FILE = "history.csv"
from flask import Flask, request, jsonify
import joblib
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Route pour récupérer l'historique des prédictions
@app.route("/history", methods=["GET"])
def get_history():
    try:
        with open(HISTORY_FILE, newline="") as f:
            reader = csv.DictReader(f)
            history = list(reader)
        return jsonify(history)
    except FileNotFoundError:
        return jsonify([])

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

    # --- SAUVEGARDE DANS L'HISTORIQUE ---
    today = datetime.date.today().isoformat()
    history_row = {
        "date": today,
        "Sommeil": data["Sommeil"],
        "Cours": data["Cours"],
        "Humeur": data["Humeur"],
        "Sport": data["Sport"],
        "Meteo": data["Meteo"],
        "result": prediction_english[0]
    }
    file_exists = os.path.isfile(HISTORY_FILE)
    with open(HISTORY_FILE, "a", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=history_row.keys())
        if not file_exists:
            writer.writeheader()
        writer.writerow(history_row)

    return jsonify({"prediction": prediction_english})

# Route pour le dashboard : statistiques globales
@app.route("/dashboard-stats", methods=["GET"])
def dashboard_stats():
    try:
        df = pd.read_csv(HISTORY_FILE)
        total = len(df)

        # Calcul des jours Excellent, Good, Low, etc.
        excellentDays = int((df["result"] == "Excellent").sum())
        goodDays = int((df["result"] == "Good").sum())
        lowDays = int((df["result"] == "Low").sum())
        averageDays = int((df["result"] == "Average").sum())

        # Moyenne de productivité (exemple : % de jours Excellent ou Good)
        average = round(100 * (excellentDays + goodDays) / total, 1) if total > 0 else 0

        # Évolution hebdomadaire (par jour de la semaine)
        df["day"] = pd.to_datetime(df["date"]).dt.day_name()
        weekly = (
            df.groupby("day")["result"]
            .apply(lambda x: (x == "Excellent").sum() * 100 / len(x) if len(x) > 0 else 0)
            .reset_index()
            .rename(columns={"result": "productivity"})
            .to_dict(orient="records")
        )

        # Tendance mensuelle (par date)
        monthly = (
            df.groupby("date")["result"]
            .apply(lambda x: (x == "Excellent").sum() * 100 / len(x) if len(x) > 0 else 0)
            .reset_index()
            .rename(columns={"result": "productivity"})
            .to_dict(orient="records")
        )

        return jsonify({
            "average": average,
            "excellentDays": excellentDays,
            "goodDays": goodDays,
            "weekly": weekly,
            "monthly": monthly
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500
        with open(HISTORY_FILE, newline="") as f:
            reader = csv.DictReader(f)
            rows = list(reader)
        total = len(rows)
        by_result = {}
        for row in rows:
            res = row["result"]
            by_result[res] = by_result.get(res, 0) + 1
        # Moyenne de sommeil (optionnel)
        try:
            avg_sleep = round(sum(float(r["Sommeil"]) for r in rows) / total, 2) if total > 0 else 0
        except Exception:
            avg_sleep = 0
        return jsonify({
            "total": total,
            "by_result": by_result,
            "avg_sleep": avg_sleep
        })
    except FileNotFoundError:
        return jsonify({"total": 0, "by_result": {}, "avg_sleep": 0})

if __name__ == "__main__":
    print("🟢 Backend démarré !")
    app.run(debug=True)