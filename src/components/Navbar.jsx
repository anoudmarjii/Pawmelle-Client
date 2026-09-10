import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <a href="#home" className="navbar-logo">
        PAWMELLE
      </a>

{/* a href becaus it same page, while link to because diff page */}
      <div className="navbar-links">
        <a href="#home">Home</a>
        <a href="#services">Services</a>
        <a href="#how-it-works">How It Works</a>
        <a href="#contact">Contact</a>

        <Link to="/login">Sign In</Link>
      </div>
    </nav>
  );
};

export default Navbar;