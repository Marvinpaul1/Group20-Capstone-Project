import "../styles/Navbar.css";

export default function Navbar({ scrollToForm }) {
  return (
    <nav className="navbar">
      <div className="nav-inner container">
        <div className="nav-logo">
          <span className="logo-icon">🪐</span>
          <span className="logo-text">planet</span>
        </div>
        <button className="nav-contact-btn" onClick={scrollToForm}>
          Contact Us
        </button>
      </div>
    </nav>
  );
}
