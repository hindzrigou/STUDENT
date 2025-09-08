import React from "react";
import "./DescriptionPage.css";
import bgImage from "./images/image2.jpg";

export default function DescriptionPage() {
  return (
    <div className="description-page">
      {/* Section titre avec image en background */}
      <div
        className="header-section"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <h1 className="title">Dashboard & History</h1>
      </div>

      {/* Section description simple */}
      <div className="content-section">
        <p>
          The <b>Dashboard</b> provides students with an intuitive view of their
          daily productivity, sleep patterns, mood, and physical activity. With
          clear charts and statistics, it allows students to track their habits,
          identify areas of improvement, and stay motivated to achieve their
          goals.
        </p>
        <p>
          The <b>History</b> feature stores past predictions and results, giving
          students the ability to review their progress over time. By analyzing
          historical data, students can better understand their behaviors and
          make informed decisions for continuous improvement.
        </p>
        <p>
          Together, the Dashboard and History enhance the student experience by
          providing <b>personalized insights</b>, <b>progress tracking</b>, and
          a <b>clear vision</b> of their academic and personal well-being.
        </p>
      </div>

      {/* Nouvelle section Why it matters */}
      <div className="why-section">
        <h2>Why it matters?</h2>
        <div className="cards">
          <div className="card">
            <h3>📊 Analytics</h3>
            <p>Get clear visualizations of your daily productivity and habits.</p>
          </div>
          <div className="card">
            <h3>⏳ Tracking</h3>
            <p>Follow your past records and measure your improvement.</p>
          </div>
          <div className="card">
            <h3>🎯 Motivation</h3>
            <p>Stay focused and motivated by seeing your long-term progress.</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="cta-section">
        <h2>Ready to improve your productivity?</h2>
        <button className="cta-btn">Explore the Dashboard</button>
      </div>
    </div>
  );
}
