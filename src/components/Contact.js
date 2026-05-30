import { FaGithub, FaLinkedin } from "react-icons/fa";
import NamasteDev from "url:../assets/NamasteDev.png";

const Contact = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Contact Me 📬</h1>

      <p style={styles.subText}>
        Thank you for visiting <strong>NamasteFood</strong> 🍴
      </p>

      <p style={styles.description}>
        This project is a part of my React learning journey and portfolio. Feel
        free to connect with me through the platforms below and explore my
        development journey, projects, and learning progress.
      </p>

      <div style={styles.cardContainer}>
        {/* LinkedIn */}
        <a
          href="https://linkedin.com/in/bhushan-patil-9b688632b/"
          target="_blank"
          rel="noreferrer"
          style={styles.card}
        >
          <FaLinkedin size={55} color="#0A66C2" />

          <h2 style={styles.cardTitle}>LinkedIn</h2>

          <p style={styles.cardText}>
            Connect with me professionally and view my career journey.
          </p>
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/Patil-K-Bhushan"
          target="_blank"
          rel="noreferrer"
          style={styles.card}
        >
          <FaGithub size={55} color="black" />

          <h2 style={styles.cardTitle}>GitHub</h2>

          <p style={styles.cardText}>
            Explore my projects, repositories, and coding work.
          </p>
        </a>

        {/* NamasteDev */}
        <a
          href="https://namastedev.com/patil.k.bhushan"
          target="_blank"
          rel="noreferrer"
          style={styles.card}
        >
          <img
            src={NamasteDev}
            alt="NamasteDev Logo"
            style={styles.logo}
            loading="lazy"
          />
          <h2 style={styles.cardTitle}>NamasteDev</h2>

          <p style={styles.cardText}>
            Follow my learning journey from the Namaste React course.
          </p>
        </a>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "80vh",
    padding: "50px 20px",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    background: "linear-gradient(to bottom, #fff8f0, #f9f9f9)",
  },

  heading: {
    fontSize: "3rem",
    color: "orange",
    marginBottom: "15px",
  },

  subText: {
    fontSize: "1.2rem",
    marginBottom: "10px",
    color: "#444",
  },

  description: {
    maxWidth: "750px",
    margin: "0 auto 50px",
    fontSize: "1.05rem",
    lineHeight: "1.8",
    color: "#555",
  },

  cardContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    flexWrap: "wrap",
    marginTop: "20px",
  },

  card: {
    width: "270px",
    padding: "35px 25px",
    borderRadius: "18px",
    backgroundColor: "white",
    textDecoration: "none",
    color: "#333",
    boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
  },

  cardTitle: {
    margin: "0",
    fontSize: "1.5rem",
  },

  cardText: {
    fontSize: "0.95rem",
    lineHeight: "1.6",
    color: "#666",
  },

  logo: {
    width: "80px",
    height: "80px",
    objectFit: "contain",
    display: "block",
  },
};

export default Contact;
