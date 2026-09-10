import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md">
      <div className="container-fluid p-0">

        <a href="#home" className="navbar-brand navbar-logo">
          PAWMELLE
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#pawmelleNavbar"
          aria-controls="pawmelleNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="pawmelleNavbar"
        >
          <div className="navbar-nav ms-auto navbar-links">
            <a href="#home" className="nav-link">Home</a>
            <a href="#services" className="nav-link">Services</a>
            <a href="#how-it-works" className="nav-link">How It Works</a>
            <a href="#contact" className="nav-link">Contact</a>

            <Link to="/login" className="nav-link">
              Sign In
            </Link>
          </div>
        </div>

      </div>
    </nav>
  );
};


export default Navbar;