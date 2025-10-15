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

@app.route("/wellbeing", methods=["POST"])
def wellbeing():
    """
    Analyse les réponses du formulaire et renvoie un message bien-être.
    """
    data = request.get_json()

    # On récupère les données du formulaire
    sommeil = float(data.get("Sommeil", 0))
    humeur = int(data.get("Humeur", 3))
    sport = data.get("Sport", "Non")
    meteo = data.get("Meteo", "Soleil")
    prediction = data.get("prediction", "Unknown")

    # Analyse simple sans IA (tu pourras plus tard connecter ChatGPT ici)
    message = "Here’s your personalized well-being advice 💬:\n\n"

    if sommeil < 5:
        message += "😴 You seem tired. Try to get more rest tonight.\n"
    elif sommeil >= 8:
        message += "🌟 Great! You had enough sleep — that’s perfect for focus.\n"

    if humeur <= 2:
        message += "💙 Seems like you’re a bit down. Take a short break, breathe, or listen to your favorite song.\n"
    elif humeur >= 4:
        message += "😊 You’re in a good mood! Keep that positive energy going.\n"

    if sport == "Non":
        message += "🏃‍♀️ Maybe a short walk could boost your mood and focus.\n"
    else:
        message += "💪 Exercise done! That’s great for mental health.\n"

    if meteo == "Pluie":
        message += "🌧️ Rainy days can make you feel sleepy. Try to work near good lighting.\n"

    if prediction.lower() in ["low", "average"]:
        message += "✨ Don’t worry — not every day is perfect. Small steps count!"
    else:
        message += "🚀 Looks like today will be productive! Keep it up!"

    return jsonify({"message": message})
