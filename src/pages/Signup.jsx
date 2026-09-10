import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import signupImg from "../assets/signup.png";

import "./Signup.css";

const BASE_URL = import.meta.env.VITE_SERVER_URL;

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [petType, setPetType] = useState("");
    const [petAge, setPetAge] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }

        axios
            .post(`${BASE_URL}/api/auth/signup`, {
                name,
                email,
                phone,
                petType,
                petAge,
                password
            })
            .then((response) => {
                console.log(response.data);

                // After successful signup, open Sign In page
                navigate("/login");
            })
            .catch((error) => {
                console.error(error);

                setMessage(
                    error.response?.data?.message ||
                    error.response?.data?.error ||
                    "Could not create account"
                );
            });
    };

    return (
        <div>
            <Navbar />

            <main className="signup-section">

                <div className="signup-card">

                    <div className="signup-heading">
                        <h1>Join Pawmelle</h1>

                        <p>
                            Create your account and make caring for your pet easier.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="signup-form-group">
                            <label>Full Name</label>

                            <input
                                type="text"
                                placeholder="Your full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="signup-form-group">
                            <label>Email</label>

                            <input
                                type="email"
                                placeholder="you@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="signup-form-group">
                            <label>Phone Number</label>

                            <input
                                type="tel"
                                placeholder="Your phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>

                        <div className="pet-fields">

                            <div className="signup-form-group">
                                <label>Pet Type</label>

                                <input
                                    type="text"
                                    placeholder="Dog, Cat, etc."
                                    value={petType}
                                    onChange={(e) => setPetType(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="signup-form-group">
                                <label>Pet Age</label>

                                <input
                                    type="number"
                                    placeholder="Age in years"
                                    value={petAge}
                                    onChange={(e) => setPetAge(e.target.value)}
                                    min="0"
                                    required
                                />
                            </div>

                        </div>

                        <div className="signup-form-group">
                            <label>Password</label>

                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="signup-form-group">
                            <label>Confirm Password</label>

                            <input
                                type="password"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="signup-btn">
                            Create Account →
                        </button>

                        {message && (
                            <p className="signup-message">{message}</p>
                        )}

                    </form>

                    <p className="signin-link">
                        Already have an account?{" "}
                        <Link to="/login">Sign In</Link>
                    </p>

                </div>

                <div className="signup-image">
                    <img src={signupImg} alt="signup" />
                </div>

            </main>

            <Footer />
        </div>
    );
};

export default Signup;