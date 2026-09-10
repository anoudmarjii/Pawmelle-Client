import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";

const BASE_URL = import.meta.env.VITE_SERVER_URL;

const Navbar = () => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate(); //for logout

  const location = useLocation();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/auth/me`, {
        withCredentials: true
      })
      .then((response) => {
        setUser(response.data.user);
      })
      .catch(() => {
        setUser(null);
      });
  }, [location.pathname]);

  
  return (
    <nav className="navbar navbar-expand-md">
      <div className="container-fluid p-0">

        <Link to="/" className="navbar-brand navbar-logo">
          PAWMELLE
        </Link>

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
            <Link to="/" className="nav-link">Home</Link>
            <a href="/#services" className="nav-link">Services</a>
            <a href="/#how-it-works" className="nav-link">How It Works</a>
            <a href="/#contact" className="nav-link">Contact</a>

            {user ? (
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
            ) : (
              <Link to="/login" className="nav-link">
                Sign In
              </Link>
            )}
          </div>
        </div>

      </div>
    </nav>
  );
};


export default Navbar;