import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner container">
        <div className="footer-about">
          <h4>About</h4>
          <p>
            This project was built by a passionate group of frontend developers
            learning React, APIs, responsive design and collaborative Git
            workflows.
          </p>
        </div>
        <div className="footer-links">
          <a
            href="https://github.com/Marvinpaul1/Group20-Capstone-Project.git"
            target="_blank"
            rel="noopener noreferrer"
          >
            Designed By Group 20 Novara Cohot
          </a>
          <a href="#">Privacy &amp; Policy</a>
          <a href="#">Terms &amp; Condition</a>
        </div>
      </div>
      <div className="footer-bottom container">
        ©2026{" "}
        <p>
          Built by Paul, Mmasi, Amaka, Ifeoma, Zion, Ansela, and Theophilus...
          All rights reserved.
        </p>
        <a
          href="https://tsacademyonline.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          TSAcademy
        </a>
      </div>
    </footer>
  );
}
