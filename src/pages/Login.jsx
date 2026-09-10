import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/navbar";
import Footer from "../components/Footer";

import loginImg from "../assets/login.png";

import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response.data);

        setMessage("Login successful");

        // Temporary until booking/profile pages are created
        navigate("/");
      })
      .catch((error) => {
        console.error(error);

        setMessage(
          error.response?.data?.message || "Login failed"
        );
      });
  };

  return (
    <div>
      <Navbar />

      <main className="login-section">

        <div className="login-image">
          <img src={loginImg} alt="login" />
        </div>

        <div className="login-card">

          <div className="login-heading">
            <h1>Welcome Back</h1>
            <p>Sign in to manage your pets and appointments.</p>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Email</label>

              <input
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>

              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="login-btn">
              Sign In →
            </button>

            {message && (
              <p className="login-message">{message}</p>
            )}

          </form>

          <p className="signup-link">
            Don't have an account?{" "}
            <Link to="/signup">Sign Up</Link>
          </p>

        </div>

      </main>

      <Footer />
    </div>
  );
};

export default Login;