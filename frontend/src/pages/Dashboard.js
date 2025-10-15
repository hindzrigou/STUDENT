import React, { useEffect, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title
);

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      setError("");
      try {
        const response = await fetch("http://127.0.0.1:5000/dashboard-stats");
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError("Erreur lors du chargement des statistiques.");
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  // Préparation des données pour les graphiques
  let barData, donutData;
  if (stats) {
    const labels = Object.keys(stats.by_result);
    const values = Object.values(stats.by_result);
    barData = {
      labels,
      datasets: [
        {
          label: "Nombre de prédictions",
          data: values,
          backgroundColor: [
            "#2563c7",
            "#00b8b8",
            "#f7b42c",
            "#fc575e",
            "#007cf0",
          ],
          borderRadius: 8,
        },
      ],
    };
    donutData = {
      labels,
      datasets: [
        {
          label: "Répartition",
          data: values,
          backgroundColor: [
            "#2563c7",
            "#00b8b8",
            "#f7b42c",
            "#fc575e",
            "#007cf0",
          ],
          borderWidth: 2,
        },
      ],
    };
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(120deg, #e0eafc 0%, #cfdef3 100%)",
        padding: "40px 0",
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          background: "#fff",
          borderRadius: 0,
          boxShadow: "0 8px 32px #b3e5fc33",
          padding: 40,
        }}
      >
        <h2
          style={{
            fontSize: "2.5rem",
            color: "#2563c7",
            marginBottom: 30,
            textAlign: "center",
            fontWeight: 900,
            letterSpacing: 1,
          }}
        >
          Dashboard Statistiques
        </h2>
        {loading ? (
          <p>Chargement...</p>
        ) : error ? (
          <p style={{ color: "#fc575e" }}>{error}</p>
        ) : stats ? (
          <>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 40,
                justifyContent: "center",
                marginBottom: 40,
              }}
            >
              <div
                style={{
                  flex: 1,
                  minWidth: 260,
                  maxWidth: 400,
                  background: "#f7fafd",
                  borderRadius: 18,
                  boxShadow: "0 4px 18px #b3e5fc33",
                  padding: 24,
                }}
              >
                <h4
                  style={{
                    color: "#2563c7",
                    marginBottom: 10,
                    fontWeight: 700,
                  }}
                >
                  Répartition des résultats
                </h4>
                <Doughnut
                  data={donutData}
                  options={{ plugins: { legend: { position: "bottom" } } }}
                />
              </div>
              <div
                style={{
                  flex: 1,
                  minWidth: 260,
                  maxWidth: 400,
                  background: "#f7fafd",
                  borderRadius: 18,
                  boxShadow: "0 4px 18px #b3e5fc33",
                  padding: 24,
                }}
              >
                <h4
                  style={{
                    color: "#2563c7",
                    marginBottom: 10,
                    fontWeight: 700,
                  }}
                >
                  Nombre de prédictions par résultat
                </h4>
                <Bar
                  data={barData}
                  options={{
                    plugins: { legend: { display: false } },
                    scales: {
                      y: { beginAtZero: true, ticks: { stepSize: 1 } },
                    },
                    borderRadius: 8,
                  }}
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: 40,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  background: "#e0f7fa",
                  borderRadius: 18,
                  padding: 32,
                  minWidth: 220,
                  textAlign: "center",
                  boxShadow: "0 2px 8px #b3e5fc33",
                }}
              >
                <div
                  style={{
                    fontSize: 38,
                    fontWeight: 900,
                    color: "#007cf0",
                    marginBottom: 8,
                  }}
                >
                  {stats.total}
                </div>
                <div style={{ color: "#2563c7", fontWeight: 700 }}>
                  Total prédictions
                </div>
              </div>
              <div
                style={{
                  background: "#e0f7fa",
                  borderRadius: 18,
                  padding: 32,
                  minWidth: 220,
                  textAlign: "center",
                  boxShadow: "0 2px 8px #b3e5fc33",
                }}
              >
                <div
                  style={{
                    fontSize: 38,
                    fontWeight: 900,
                    color: "#00b8b8",
                    marginBottom: 8,
                  }}
                >
                  {stats.avg_sleep}
                </div>
                <div style={{ color: "#2563c7", fontWeight: 700 }}>
                  Moyenne d'heures de sommeil
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default Dashboard;
