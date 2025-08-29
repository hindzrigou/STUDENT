import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import timeImg from "./images/time.png";
import focusImg from "./images/focus.jpg";
import trackingImg from "./images/tracking.jpg";
import wellbeingImg from "./images/wellbeing.jpg";

const whyData = [
  {
    title: "Time Management",
    text: "Easily organize your tasks and schedule.",
    img: timeImg,
  },
  {
    title: "Focus & Productivity",
    text: "Stay concentrated with smart prediction tools.",
    img: focusImg,
  },
  {
    title: "Personalized Tracking",
    text: "Visualize your progress with charts & history.",
    img: trackingImg,
  },
  {
    title: "Well-being",
    text: "Balance study and health with quick exercises.",
    img: wellbeingImg,
  },
];

function WhySmartDay() {
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisible((prev) => [...prev, index]);
          }
        });
      },
      { threshold: 0.5 }
    );

    document
      .querySelectorAll(".why-card")
      .forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="why-smartday-section" id="why-smartday">
      <h2>Why Choose SmartDay?</h2>
      <div className="why-list">
        {whyData.map((item, index) => (
          <div
            key={index}
            className={`why-card ${visible.includes(index) ? "visible" : ""} ${
              index % 2 === 0 ? "from-left" : "from-right"
            }`}
            data-index={index}
          >
            <img src={item.img} alt={item.title} className="why-img" />
            
            {/* Nouveau wrapper pour texte */}
            <div className="why-text">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WhySmartDay;
