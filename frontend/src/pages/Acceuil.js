import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import picture from "./images/picture.jpg";
import WhySmartDay from "./WhySmartDay.js";

function Accueil() {
  const navigate = useNavigate();
  const fullText =
    "Welcome to SmartDay – the smart student platform that helps you predict your productivity, organize your tasks, and take care of your well-being.";
  const [displayedText, setDisplayedText] = useState("");
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) {
        clearInterval(interval);
        // Affiche le bouton seulement après que tout le texte soit affiché
        setTimeout(() => setShowButton(true), 300); // petit délai pour plus de fluidité
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div
        className="body"
        style={{
          backgroundImage: `url(${picture})`,
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          minHeight: "1000px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          paddingRight: "10vw",
        }}
      >
        <p className="intro-text typewriter">{displayedText}</p>
        {showButton && <button className="learn-more-btn">Learn More</button>}
      </div>

      <div className="services-section" id="Services">
        <h2>Our Services</h2>
        <div className="services-list">
          <div
            className="service-card"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/prediction")}
            tabIndex={0}
            role="button"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") navigate("/prediction");
            }}
          >
            <svg viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="20" fill="#00dfd8" opacity=".18" />
              <path
                d="M24 12v12l8 4"
                stroke="#00b8b8"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
            <h3>Smart Prediction</h3>
            <p>Know if your day will be productive or not</p>
          </div>
          <a className="service-card" href="/tracking-dashboard">
            <svg viewBox="0 0 48 48">
              <rect x="8" y="20" width="6" height="16" rx="2" fill="#00dfd8" />
              <rect x="20" y="12" width="6" height="24" rx="2" fill="#00b8b8" />
              <rect x="32" y="28" width="6" height="8" rx="2" fill="#00dfd8" />
            </svg>
            <h3>Tracking & Dashboard</h3>
            <p>History and personalized charts</p>
          </a>
          <a className="service-card" href="/organization-tools">
            <svg viewBox="0 0 48 48">
              <rect
                x="10"
                y="14"
                width="28"
                height="20"
                rx="4"
                fill="#00dfd8"
                opacity=".18"
              />
              <rect x="16" y="20" width="16" height="8" rx="2" fill="#00b8b8" />
            </svg>
            <h3>Organization & Tools</h3>
            <p>To-Do list, planner, Pomodoro</p>
          </a>
          <a className="service-card" href="/student-wellbeing">
            <svg viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="20" fill="#00dfd8" opacity=".18" />
              <path
                d="M16 28c2-4 6-8 8-8s6 4 8 8"
                stroke="#00b8b8"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
              />
              <circle cx="24" cy="20" r="3" fill="#00b8b8" />
            </svg>
            <h3>Student Well-being</h3>
            <p>Tips and quick exercises</p>
          </a>
        </div>
      </div>

      <WhySmartDay />

      <div className="contact-section" id="Contact">
        <h2>Contact Us</h2>
        <p>Have questions or want to get in touch? Fill out the form below.</p>
        <form className="contact-form">
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea
            name="message"
            rows="5"
            placeholder="Your Message"
            required
          ></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </>
  );
}
export default Accueil;
