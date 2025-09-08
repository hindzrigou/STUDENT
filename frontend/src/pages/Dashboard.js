import React, { useEffect, useState } from "react";
import backgroundImage from "./assets/background.png"; 
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ['#2986CC', '#69A4D9', '#AAD1F0', '#E5EFF8'];

const cardStyle = {
  backgroundColor: '#fff',
  borderRadius: '1rem',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  padding: '2rem',
  marginBottom: '2rem'
};

function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/dashboard-stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Erreur chargement stats :", err));
  }, []);

  if (!stats) {
    return <p style={{ textAlign: "center", marginTop: "4rem" }}>Chargement des statistiques...</p>;
  }

  const productivityRatings = [
    { name: "Excellent", value: stats.excellentDays || 0 },
    { name: "Good", value: stats.goodDays || 0 },
    { name: "Average", value: stats.averageDays || 0 },
    { name: "Low", value: stats.lowDays || 0 },
  ];

  const pieData = productivityRatings.filter(item => item.value > 0);

  return (
    <div 
      className="dashboard-page"
      style={{ 
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: '100vh',
        padding: '2rem',
        marginTop: '120px',
      }}
    >
      <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: '#1B63A4' ,fontWeight: 'bold' ,fontSize: '4rem'}}>Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={cardStyle}>
          <h2>Productivity Overview</h2>
          <div style={{ fontSize: '4rem', fontWeight: 'bold', color: '#1B63A4' }}>
            {stats.average}%
          </div>
          <p style={{ color: '#888' }}>Average productivity this week</p>
        </div>

        <div style={cardStyle}>
          <h2>Productivity Ratings</h2>
          {productivityRatings.map((item) => (
            <div key={item.name} style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{item.name}</span>
                <span>{item.value}</span>
              </div>
              <div style={{ backgroundColor: '#E5EFF8', borderRadius: '1rem', height: '0.75rem', marginTop: '0.25rem' }}>
                <div style={{ width: `${(item.value / 10) * 100}%`, backgroundColor: '#1B63A4', borderRadius: '1rem', height: '100%' }} />
              </div>
            </div>
          ))}
        </div>

        <div style={cardStyle}>
          <h2>Productivity Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats.weekly}>
              <XAxis dataKey="day" />
              <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
              <Tooltip />
              <Line type="monotone" dataKey="productivity" stroke="#1B63A4" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={cardStyle}>
          <h2>Productivity Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie 
                data={pieData} 
                dataKey="value" 
                nameKey="name" 
                cx="50%" 
                cy="50%" 
                outerRadius={80} 
                label={(entry) => `${entry.name}: ${entry.value}`} 
                labelLine={true}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
