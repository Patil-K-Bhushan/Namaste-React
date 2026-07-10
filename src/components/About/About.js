import React from "react";
import "./About.css";

const About = () => (
  <div className="About">
    <h1 className="about-heading">About NamasteFood 🍴</h1>
    <p className="about-paragraph">
      NamasteFood is a modern food ordering web application built as a
      personal project while learning React.js from the
      <strong> Namaste React Course by Akshay Saini</strong>.
    </p>
    <p className="about-paragraph">
      This project was developed completely by me to strengthen my
      frontend development skills and gain hands-on experience with
      real-world React concepts such as:
    </p>
    <ul className="about-list">
      <li>React Functional Components</li>
      <li>React Hooks (useState, useEffect)</li>
      <li>React Router DOM</li>
      <li>Responsive Web Design</li>
      <li>Modern UI Styling with CSS</li>
      <li>Dynamic Rendering & API Integration</li>
      <li>Cart & Navigation Features</li>
    </ul>
    <p className="about-paragraph">
      The main goal of this project is to build a scalable and
      responsive food delivery platform inspired by real-world
      applications while improving problem-solving and frontend
      engineering skills.
    </p>
    <p className="about-paragraph">
      This project also reflects my dedication toward becoming a
      skilled Full Stack Developer by continuously building practical
      and industry-oriented applications.
    </p>
    <div className="about-footer">
      <h3>Developer 👨‍💻</h3>
      <p>
        Built with ❤️ using React.js by <strong>Bhushan Patil</strong>
      </p>
    </div>
  </div>
);

export default About;
