import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import NamasteDev from "url:../../assets/NamasteDev.png";
import "./Contact.css";

const Contact = () => (
  <div className="contact-container">
    <h1 className="contact-heading">Contact Me 📬</h1>
    <p className="contact-subtext">
      Thank you for visiting <strong>NamasteFood</strong> 🍴
    </p>
    <p className="contact-description">
      This project is a part of my React learning journey and portfolio. Feel
      free to connect with me through the platforms below and explore my
      development journey, projects, and learning progress.
    </p>
    <div className="contact-card-container">
      <a href="https://linkedin.com/in/bhushan-k-patil" target="_blank" rel="noreferrer" className="contact-card">
        <FaLinkedin size={55} color="#0A66C2" />
        <h2 className="contact-card-title">LinkedIn</h2>
        <p className="contact-card-text">Connect with me professionally and view my career journey.</p>
      </a>
      <a href="https://github.com/Patil-K-Bhushan" target="_blank" rel="noreferrer" className="contact-card">
        <FaGithub size={55} color="black" />
        <h2 className="contact-card-title">GitHub</h2>
        <p className="contact-card-text">Explore my projects, repositories, and coding work.</p>
      </a>
      <a href="https://namastedev.com/patil.k.bhushan" target="_blank" rel="noreferrer" className="contact-card">
        <img src={NamasteDev} alt="NamasteDev Logo" className="contact-logo" loading="lazy" />
        <h2 className="contact-card-title">NamasteDev</h2>
        <p className="contact-card-text">Follow my learning journey from the Namaste React course.</p>
      </a>
    </div>
  </div>
);

export default Contact;
