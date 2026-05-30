const About = () => {
    return (
        <div className="About" style={styles.container}>
            <h1 style={styles.heading}>About NamasteFood 🍴</h1>

            <p style={styles.paragraph}>
                NamasteFood is a modern food ordering web application built as a
                personal project while learning React.js from the
                <strong> Namaste React Course by Akshay Saini</strong>.
            </p>

            <p style={styles.paragraph}>
                This project was developed completely by me to strengthen my
                frontend development skills and gain hands-on experience with
                real-world React concepts such as:
            </p>

            <ul style={styles.list}>
                <li>React Functional Components</li>
                <li>React Hooks (useState, useEffect)</li>
                <li>React Router DOM</li>
                <li>Responsive Web Design</li>
                <li>Modern UI Styling with CSS</li>
                <li>Dynamic Rendering & API Integration</li>
                <li>Cart & Navigation Features</li>
            </ul>

            <p style={styles.paragraph}>
                The main goal of this project is to build a scalable and
                responsive food delivery platform inspired by real-world
                applications while improving problem-solving and frontend
                engineering skills.
            </p>

            <p style={styles.paragraph}>
                This project also reflects my dedication toward becoming a
                skilled Full Stack Developer by continuously building practical
                and industry-oriented applications.
            </p>

            <div style={styles.footer}>
                <h3>Developer 👨‍💻</h3>
                <p>
                    Built with ❤️ using React.js by <strong>Bhushan Patil</strong>
                </p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: "900px",
        margin: "40px auto",
        padding: "30px",
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.8",
        color: "#333",
    },

    heading: {
        fontSize: "2.5rem",
        color: "orange",
        marginBottom: "20px",
        textAlign: "center",
    },

    paragraph: {
        fontSize: "1.1rem",
        marginBottom: "18px",
    },

    list: {
        paddingLeft: "20px",
        marginBottom: "20px",
        fontSize: "1.05rem",
    },

    footer: {
        marginTop: "35px",
        padding: "20px",
        borderTop: "2px solid #eee",
        textAlign: "center",
    },
};

export default About;