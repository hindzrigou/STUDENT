# train_model.py
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib

# Charger le dataset
df = pd.read_csv("data.csv")

# Harmoniser les noms de colonnes
df.rename(columns={"Météo": "Meteo"}, inplace=True)

# Convertir colonnes catégorielles en numériques
df = pd.get_dummies(df, columns=["Sport", "Meteo"], drop_first=True)

# Séparer features et target
X = df.drop("Productif", axis=1)
y = df["Productif"]

# Entraîner le modèle
model = RandomForestClassifier()
model.fit(X, y)

# Sauvegarder le modèle
joblib.dump(model, "model_productivity.pkl")

print("✅ Modèle entraîné et sauvegardé !")