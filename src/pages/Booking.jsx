import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/navbar";
import Footer from "../components/Footer";

import "./Booking.css";

const BASE_URL = import.meta.env.VITE_SERVER_URL;

const Booking = () => {

    const [pets, setPets] = useState([]);
    const [services, setServices] = useState([]);

    const [selectedPet, setSelectedPet] = useState(null);
    const [selectedService, setSelectedService] = useState(null);

    const [appointmentDate, setAppointmentDate] = useState("");
    const [appointmentTime, setAppointmentTime] = useState("");

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();


    const availableTimes = [
        "10:00",
        "11:30",
        "13:00",
        "15:30",
        "17:00"
    ];

    const [searchParams] = useSearchParams();

    const serviceId = searchParams.get("service");


    useEffect(() => {

        Promise.all([
            axios.get(
                    `${BASE_URL}/api/pets`,
                {
                    withCredentials: true
                }
            ),

            axios.get(
                `${BASE_URL}/api/services`
            )
        ])
            .then(([petsResponse, servicesResponse]) => {

                setPets(petsResponse.data);
                setServices(servicesResponse.data);

                if (serviceId) {
                    const service = servicesResponse.data.find(
                        (service) =>
                            service.id === Number(serviceId)
                    );

                    if (service) {
                        setSelectedService(service);
                    }
                }

                setLoading(false);
            })
            .catch((error) => {

                console.error(error);

                if (error.response?.status === 401) {
                    navigate("/login");
                }

                setLoading(false);
            });

    }, [navigate, serviceId]);


    const handleConfirmAppointment = () => {

        if (
            !selectedPet ||
            !selectedService ||
            !appointmentDate ||
            !appointmentTime
        ) {
            setMessage(
                "Please select a pet, service, date, and time."
            );

            return;
        }


        axios
            .post(
                    `${BASE_URL}/api/appointments`,
                {
                    pet_id: selectedPet.id,
                    service_id: selectedService.id,
                    appointment_date: appointmentDate,
                    appointment_time: appointmentTime
                },
                {
                    withCredentials: true
                }
            )
            .then(() => {

                navigate("/profile");

            })
            .catch((error) => {

                console.error(error);

                setMessage(
                    error.response?.data?.message ||
                    "Could not book appointment."
                );
            });
    };


    const formatTime = (time) => {

        const [hour, minute] = time.split(":");

        const date = new Date();

        date.setHours(hour);
        date.setMinutes(minute);

        return date.toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit"
        });
    };


    if (loading) {
        return <p>Loading...</p>;
    }


    return (
        <div>

            <Navbar />

            <main className="booking-page">

                <section className="booking-heading">

                    <h1>Book an Appointment</h1>

                    <p>
                        Choose the right care, date, and time for your pet.
                    </p>

                </section>


                {/* STEPS */}

                <div className="booking-steps">

                    <div className="booking-step active">
                        1&nbsp;&nbsp; Pet
                    </div>

                    <div className="booking-step">
                        2&nbsp;&nbsp; Service
                    </div>

                    <div className="booking-step">
                        3&nbsp;&nbsp; Date & Time
                    </div>

                    <div className="booking-step">
                        4&nbsp;&nbsp; Confirm
                    </div>

                </div>


                <div className="booking-layout">


                    {/* LEFT CARD */}

                    <section className="booking-form-card">


                        {/* PET */}

                        <div className="booking-section">

                            <h2>1. Select your pet</h2>

                            <p>
                                Choose which pet this appointment is for.
                            </p>


                            {pets.length === 0 ? (

                                <p className="booking-empty">
                                    You don't have any pets yet.
                                </p>

                            ) : (

                                <div className="booking-options-grid">

                                    {pets.map((pet) => (

                                        <button
                                            type="button"
                                            key={pet.id}
                                            className={
                                                selectedPet?.id === pet.id
                                                    ? "booking-option selected"
                                                    : "booking-option"
                                            }
                                            onClick={() =>
                                                setSelectedPet(pet)
                                            }
                                        >

                                            <div>

                                                <h3>
                                                    {pet.species}
                                                </h3>

                                                <span>
                                                    {pet.breed
                                                        ? `${pet.breed} · `
                                                        : ""}

                                                    {pet.age} years
                                                </span>

                                            </div>


                                            <div
                                                className={
                                                    selectedPet?.id === pet.id
                                                        ? "option-circle selected-circle"
                                                        : "option-circle"
                                                }
                                            />

                                        </button>

                                    ))}

                                </div>

                            )}


                            <button
                                type="button"
                                className="add-pet-booking-btn"
                                onClick={() => navigate("/profile")}
                            >
                                + Add New Pet
                            </button>

                        </div>


                        {/* SERVICES */}

                        <div className="booking-section">

                            <h2>2. Choose a service</h2>

                            <p>
                                Select the type of care you need.
                            </p>


                            <div className="booking-options-grid">

                                {services.map((service) => (

                                    <button
                                        type="button"
                                        key={service.id}
                                        className={
                                            selectedService?.id === service.id
                                                ? "service-option selected"
                                                : "service-option"
                                        }
                                        onClick={() =>
                                            setSelectedService(service)
                                        }
                                    >

                                        <div>

                                            <h3>
                                                {service.name}
                                            </h3>

                                            <span>
                                                {service.duration} min
                                            </span>

                                        </div>


                                        {selectedService?.id === service.id && (
                                            <div className="service-selected-circle" />
                                        )}

                                    </button>

                                ))}

                            </div>

                        </div>

                    </section>



                    {/* RIGHT CARD */}

                    <section className="appointment-details-card">

                        <h2>
                            Appointment Details
                        </h2>


                        <h3>
                            3. Select date & time
                        </h3>


                        <label>
                            Date
                        </label>

                        <input
                            type="date"
                            className="booking-date"
                            value={appointmentDate}
                            onChange={(e) =>
                                setAppointmentDate(e.target.value)
                            }
                            min={new Date()
                                .toISOString()
                                .split("T")[0]}
                        />


                        <label className="available-label">
                            Available times
                        </label>


                        <div className="time-options">

                            {availableTimes.map((time) => (

                                <button
                                    type="button"
                                    key={time}
                                    className={
                                        appointmentTime === time
                                            ? "time-btn selected-time"
                                            : "time-btn"
                                    }
                                    onClick={() =>
                                        setAppointmentTime(time)
                                    }
                                >
                                    {formatTime(time)}
                                </button>

                            ))}

                        </div>


                        <div className="booking-price">

                            <strong>
                                Price
                            </strong>

                            <strong>
                                {selectedService
                                    ? `${selectedService.price} JD`
                                    : "--"}
                            </strong>

                        </div>


                        {message && (
                            <p className="booking-message">
                                {message}
                            </p>
                        )}


                        <button
                            className="confirm-booking-btn"
                            onClick={handleConfirmAppointment}
                        >
                            Confirm Appointment →
                        </button>

                    </section>

                </div>

            </main>

            <Footer />

        </div>
    );
};

export default Booking;