import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/navbar";
import ServiceCard from "../components/ServiceCard";
import Footer from "../components/Footer";

import dogImage from "../assets/hero-dog.png";
import catImage from "../assets/hero-cat.png";
import ownerPetImage from "../assets/owner-pet.png";

import "./Home.css";

const BASE_URL = import.meta.env.VITE_SERVER_URL;

const Home = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        axios
            .get(`${BASE_URL}/api/services`)
            .then((response) => {
                setServices(response.data);
            })
            .catch((error) => {
                console.error("Error loading services:", error);
            });
    }, []);

    const handleBook = (service) => {
        console.log("Selected service:", service);
    };

    const navigate = useNavigate();


    return (
        <div id="home">
            <Navbar />

            <section className="hero">
                <div className="hero-text">
                    <h1>
                        Care for Your
                        <br />
                        Furry Friend
                    </h1>

                    <p>Simple, reliable care for your pet — all in one place.</p>

                    <div className="hero-buttons">
                        <button
                            className="primary-btn"
                            onClick={() => navigate("/booking")}
                        >
                            Book Appointment →
                        </button>

                        <a href="#services" className="secondary-btn">
                            Our Services →
                        </a>
                    </div>
                </div>

                <div className="hero-images">
                    <div className="dog-placeholder">
                        <img src={dogImage} alt="Dog" />
                    </div>

                    <div className="cat-placeholder">
                        <img src={catImage} alt="Cat" />
                    </div>
                </div>
            </section>

            {/* services section */}
            <section className="services-section" id="services">

                <div className="services-heading">
                    <h2>Care Made for Every Paw</h2>

                    <p>
                        Professional pet care services designed for happy, healthy companions.
                    </p>
                </div>

                <div className="services-grid">

                    {services.map((service) => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                            onBook={() =>
                                navigate(`/booking?service=${service.id}`)
                            }
                        />
                    ))}

                </div>

            </section>

            {/* how it works section */}
            <section className="how-it-works" id="how-it-works">

                <div className="how-heading">
                    <h2>Happy Pets in a Few Easy Steps</h2>
                    <p>Getting the care your pet needs should be simple.</p>
                </div>

                <div className="steps-layout">

                    <div className="steps-column">
                        <div className="step-card">
                            <span className="step-number">01</span>

                            <div>
                                <h3>Create Your Pet Profile</h3>
                                <p>Add your pet and basic information.</p>
                            </div>
                        </div>

                        <div className="step-card">
                            <span className="step-number">02</span>

                            <div>
                                <h3>Choose Their Care</h3>
                                <p>Select the service that suits your pet.</p>
                            </div>
                        </div>
                    </div>

                    <div className="owner-pet-image">
                        <img src={ownerPetImage} alt="Pet owner with pet" />
                    </div>

                    <div className="steps-column">
                        <div className="step-card">
                            <span className="step-number">03</span>

                            <div>
                                <h3>Book an Appointment</h3>
                                <p>Choose a convenient date and time.</p>
                            </div>
                        </div>

                        <div className="step-card">
                            <span className="step-number">04</span>

                            <div>
                                <h3>Relax & Let Us Care</h3>
                                <p>Track the appointment and relax.</p>
                            </div>
                        </div>
                    </div>

                </div>

            </section>

            {/* contact us section */}
            <section className="contact-section" id="contact">

                <div className="contact-heading">
                    <h2>Contact Us</h2>
                    <p>
                        Have a question about your pet's care? We'd love to hear from you.
                    </p>
                </div>

                <div className="contact-grid">

                    <div className="contact-card">
                        <h3>Visit Pawmelle</h3>
                        <p>Amman, Jordan</p>
                        <br />
                        <p>Pet care center location</p>
                        <p>Easy access and nearby parking.</p>
                    </div>

                    <div className="contact-card">
                        <h3>Opening Hours</h3>
                        <p>Sun – Thu: 9:00 AM – 8:00 PM</p>
                        <p>Saturday: 10:00 AM – 6:00 PM</p>
                        <p>Friday: Closed</p>
                    </div>

                    <div className="contact-card">
                        <h3>Call Us</h3>
                        <p>+962 79 587 0582</p>
                    </div>

                    <div className="contact-card">
                        <h3>Email Us</h3>
                        <p>hello@pawmelle.com</p>
                    </div>

                </div>

            </section>

            <Footer />
        </div>
    );
};

export default Home;