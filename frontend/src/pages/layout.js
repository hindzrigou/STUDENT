import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./style.css";
import logo from "./images/logo.png";

function Layout() {
  const navigate = useNavigate();
  return (
    <div className="acceuil">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <img src={logo} alt="Logo de SmartDay" />
          <h1>SmartDay</h1>
        </div>
        <nav className="nav">
          <ul>
            <li>
              <a href="#acceuil">Accueil</a>
            </li>
            <li>
              <a href="#Services">Services</a>
            </li>
            <li>
              <a href="#Communauté">Communauté</a>
            </li>
            <li>
              <a href="#Profil">Profil</a>
            </li>
            <li>
              <a href="#Contact">Contact</a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Contenu de la page */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-about">
            <h3>SmartDay</h3>
            <p>
              Your smart student platform to boost productivity and well-being.
            </p>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="#acceuil">Home</a>
              </li>
              <li>
                <a href="#Services">Services</a>
              </li>
              <li>
                <a href="#why-smartday">Why SmartDay</a>
              </li>
              <li>
                <a href="#Contact">Contact</a>
              </li>
            </ul>
          </div>

          <div className="footer-social">
            <h4>Follow Us</h4>
            <div className="social-icons">
              <a href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} SmartDay. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
