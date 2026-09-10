import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/navbar";
import Footer from "../components/Footer";

import "./Profile.css";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingProfile, setEditingProfile] = useState(false);
    const [editName, setEditName] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editPhone, setEditPhone] = useState("");
    const [profileMessage, setProfileMessage] = useState("");

    const [showAddPet, setShowAddPet] = useState(false);
    const [newSpecies, setNewSpecies] = useState("");
    const [newBreed, setNewBreed] = useState("");
    const [newAge, setNewAge] = useState("");
    const [petMessage, setPetMessage] = useState("");

    const [editingPetId, setEditingPetId] = useState(null);
    const [editSpecies, setEditSpecies] = useState("");
    const [editBreed, setEditBreed] = useState("");
    const [editAge, setEditAge] = useState("");

    const [appointments, setAppointments] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        // Get logged-in user
        axios
            .get("http://localhost:5000/api/auth/me", {
                withCredentials: true
            })
            .then((response) => {
                setUser(response.data.user);

                // Get user's pets
                return axios.get(
                    "http://localhost:5000/api/pets",
                    {
                        withCredentials: true
                    }
                );
            })
            .then((response) => {
                setPets(response.data);

                return axios.get(
                    "http://localhost:5000/api/appointments",
                    {
                        withCredentials: true
                    }
                );
            })
            .then((response) => {
                setAppointments(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);

                // If user is not logged in
                if (error.response?.status === 401) {
                    navigate("/login");
                }

                setLoading(false);
            });

    }, [navigate]);


    const handleEditProfile = () => {
        setEditName(user.name);
        setEditEmail(user.email);
        setEditPhone(user.phone || "");

        setEditingProfile(true);
    };


    const handleUpdateProfile = (e) => {
        e.preventDefault();

        axios
            .put(
                "http://localhost:5000/api/users/profile",
                {
                    name: editName,
                    email: editEmail,
                    phone: editPhone
                },
                {
                    withCredentials: true
                }
            )
            .then((response) => {
                setUser(response.data.user);

                setEditingProfile(false);

                setProfileMessage("Profile updated successfully");
            })
            .catch((error) => {
                console.error(error);

                setProfileMessage(
                    error.response?.data?.message ||
                    "Could not update profile"
                );
            });
    };

    const handleAddPet = (e) => {
        e.preventDefault();

        axios
            .post(
                "http://localhost:5000/api/pets",
                {
                    species: newSpecies,
                    breed: newBreed,
                    age: newAge
                },
                {
                    withCredentials: true
                }
            )
            .then((response) => {

                // Add the new pet immediately to the page
                setPets((previousPets) => [
                    ...previousPets,
                    response.data.pet
                ]);

                setNewSpecies("");
                setNewBreed("");
                setNewAge("");

                setShowAddPet(false);

                setPetMessage("Pet added successfully");
            })
            .catch((error) => {
                console.error(error);

                setPetMessage(
                    error.response?.data?.message ||
                    "Could not add pet"
                );
            });
    };


    // editing pets
    const handleEditPet = (pet) => {
        setEditingPetId(pet.id);

        setEditSpecies(pet.species);
        setEditBreed(pet.breed || "");
        setEditAge(pet.age);
    };


    const handleUpdatePet = (e, petId) => {
        e.preventDefault();

        axios
            .put(
                `http://localhost:5000/api/pets/${petId}`,
                {
                    species: editSpecies,
                    breed: editBreed,
                    age: editAge
                },
                {
                    withCredentials: true
                }
            )
            .then((response) => {

                // Replace the old pet with the updated pet
                setPets((previousPets) =>
                    previousPets.map((pet) =>
                        pet.id === petId
                            ? response.data.pet
                            : pet
                    )
                );

                setEditingPetId(null);

                setPetMessage("Pet updated successfully");
            })
            .catch((error) => {
                console.error(error);

                setPetMessage(
                    error.response?.data?.message ||
                    "Could not update pet"
                );
            });
    };


    const handleDeletePet = (petId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this pet?"
        );

        if (!confirmDelete) {
            return;
        }

        axios
            .delete(
                `http://localhost:5000/api/pets/${petId}`,
                {
                    withCredentials: true
                }
            )
            .then(() => {

                // Remove pet from the page immediately
                setPets((previousPets) =>
                    previousPets.filter(
                        (pet) => pet.id !== petId
                    )
                );

                setPetMessage("Pet deleted successfully");
            })
            .catch((error) => {
                console.error(error);

                setPetMessage(
                    error.response?.data?.message ||
                    "Could not delete pet"
                );
            });
    };


    // cancel appointment
    const handleCancelAppointment = (appointmentId) => {

        const confirmCancel = window.confirm(
            "Are you sure you want to cancel this appointment?"
        );

        if (!confirmCancel) {
            return;
        }

        axios
            .put(
                `http://localhost:5000/api/appointments/${appointmentId}/cancel`,
                {},
                {
                    withCredentials: true
                }
            )
            .then((response) => {

                setAppointments((previousAppointments) =>
                    previousAppointments.map((appointment) =>
                        appointment.id === appointmentId
                            ? {
                                ...appointment,
                                status: response.data.appointment.status
                            }
                            : appointment
                    )
                );

            })
            .catch((error) => {
                console.error(error);
            });
    };


    // logout
    const handleLogout = () => {
        axios
            .post(
                "http://localhost:5000/api/auth/logout",
                {},
                {
                    withCredentials: true
                }
            )
            .then(() => {
                navigate("/");
            })
            .catch((error) => {
                console.error("Logout failed:", error);
            });
    };


    if (loading) {
        return <p className="profile-loading">Loading...</p>;
    }


    return (
        <div>

            <Navbar />

            <main className="profile-page">

                {/* Page Heading */}
                <section className="profile-heading">

                    <div className="profile-heading-row">

                        <div>
                            <h1>My Profile</h1>

                            <p>
                                Manage your personal information, pets, and appointments.
                            </p>
                        </div>

                        <button
                            className="profile-logout-btn"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>

                    </div>

                </section>


                {/* Owner Information */}
                <section className="owner-card">

                    {!editingProfile ? (

                        <>
                            <div>
                                <h2>{user?.name}</h2>

                                <p className="owner-role">
                                    Pet Owner
                                </p>

                                <div className="owner-details">

                                    <div>
                                        <span>Email</span>
                                        <p>{user?.email}</p>
                                    </div>

                                    <div>
                                        <span>Phone</span>
                                        <p>{user?.phone}</p>
                                    </div>

                                </div>
                            </div>

                            <button
                                className="outline-btn"
                                onClick={handleEditProfile}
                            >
                                Edit Profile
                            </button>
                        </>

                    ) : (

                        <form
                            className="edit-profile-form"
                            onSubmit={handleUpdateProfile}
                        >

                            <div className="edit-profile-fields">

                                <div>
                                    <label>Name</label>

                                    <input
                                        type="text"
                                        value={editName}
                                        onChange={(e) =>
                                            setEditName(e.target.value)
                                        }
                                        required
                                    />
                                </div>


                                <div>
                                    <label>Email</label>

                                    <input
                                        type="email"
                                        value={editEmail}
                                        onChange={(e) =>
                                            setEditEmail(e.target.value)
                                        }
                                        required
                                    />
                                </div>


                                <div>
                                    <label>Phone</label>

                                    <input
                                        type="tel"
                                        value={editPhone}
                                        onChange={(e) =>
                                            setEditPhone(e.target.value)
                                        }
                                        required
                                    />
                                </div>

                            </div>


                            <div className="edit-profile-buttons">

                                <button
                                    type="submit"
                                    className="primary-profile-btn"
                                >
                                    Save
                                </button>

                                <button
                                    type="button"
                                    className="outline-btn"
                                    onClick={() =>
                                        setEditingProfile(false)
                                    }
                                >
                                    Cancel
                                </button>

                            </div>

                        </form>

                    )}

                </section>

                {profileMessage && (
                    <p className="profile-message">
                        {profileMessage}
                    </p>
                )}


                {/* Pets Heading */}
                <section className="pets-section">

                    <div className="section-title-row">

                        <div>
                            <h2>My Pets</h2>

                            <p>
                                Add, edit, or remove your pet profiles.
                            </p>
                        </div>

                        <button
                            className="primary-profile-btn"
                            onClick={() => setShowAddPet(!showAddPet)}
                        >
                            + Add Pet
                        </button>

                    </div>

                    {/* to add a pet */}
                    {showAddPet && (

                        <form
                            className="add-pet-form"
                            onSubmit={handleAddPet}
                        >

                            <div className="add-pet-fields">

                                <div>
                                    <label>Pet Type</label>

                                    <input
                                        type="text"
                                        placeholder="Dog, Cat, etc."
                                        value={newSpecies}
                                        onChange={(e) =>
                                            setNewSpecies(e.target.value)
                                        }
                                        required
                                    />
                                </div>


                                <div>
                                    <label>Breed</label>

                                    <input
                                        type="text"
                                        placeholder="Golden Retriever, Persian..."
                                        value={newBreed}
                                        onChange={(e) =>
                                            setNewBreed(e.target.value)
                                        }
                                    />
                                </div>


                                <div>
                                    <label>Age</label>

                                    <input
                                        type="number"
                                        placeholder="Age"
                                        value={newAge}
                                        onChange={(e) =>
                                            setNewAge(e.target.value)
                                        }
                                        min="0"
                                        step="0.1"
                                        required
                                    />
                                </div>

                            </div>


                            <div className="add-pet-buttons">

                                <button
                                    type="submit"
                                    className="primary-profile-btn"
                                >
                                    Save Pet
                                </button>

                                <button
                                    type="button"
                                    className="outline-btn"
                                    onClick={() => setShowAddPet(false)}
                                >
                                    Cancel
                                </button>

                            </div>

                        </form>

                    )}

                    {petMessage && (
                        <p className="profile-message">
                            {petMessage}
                        </p>
                    )}


                    {/* Pet Cards */}
                    <div className="pets-grid">

                        {pets.map((pet) => (

                            <div
                                className="pet-card"
                                key={pet.id}
                            >

                                {editingPetId === pet.id ? (

                                    <form
                                        className="edit-pet-form"
                                        onSubmit={(e) =>
                                            handleUpdatePet(e, pet.id)
                                        }
                                    >

                                        <div className="edit-pet-fields">

                                            <div>
                                                <label>Pet Type</label>

                                                <input
                                                    type="text"
                                                    value={editSpecies}
                                                    onChange={(e) =>
                                                        setEditSpecies(e.target.value)
                                                    }
                                                    required
                                                />
                                            </div>


                                            <div>
                                                <label>Breed</label>

                                                <input
                                                    type="text"
                                                    value={editBreed}
                                                    onChange={(e) =>
                                                        setEditBreed(e.target.value)
                                                    }
                                                />
                                            </div>


                                            <div>
                                                <label>Age</label>

                                                <input
                                                    type="number"
                                                    value={editAge}
                                                    onChange={(e) =>
                                                        setEditAge(e.target.value)
                                                    }
                                                    min="0"
                                                    step="0.1"
                                                    required
                                                />
                                            </div>

                                        </div>


                                        <div className="edit-pet-buttons">

                                            <button
                                                type="submit"
                                                className="primary-profile-btn"
                                            >
                                                Save
                                            </button>

                                            <button
                                                type="button"
                                                className="outline-btn"
                                                onClick={() =>
                                                    setEditingPetId(null)
                                                }
                                            >
                                                Cancel
                                            </button>

                                        </div>

                                    </form>

                                ) : (

                                    <>
                                        <div className="pet-info">

                                            <h3>{pet.species}</h3>

                                            {pet.breed && (
                                                <p>{pet.breed}</p>
                                            )}

                                            <div className="pet-age">

                                                <span>Age</span>

                                                <p>{pet.age} years</p>

                                            </div>

                                        </div>


                                        <div className="pet-actions">

                                            <button
                                                className="small-outline-btn"
                                                onClick={() =>
                                                    handleEditPet(pet)
                                                }
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="small-outline-btn"
                                                onClick={() =>
                                                    handleDeletePet(pet.id)
                                                }
                                            >
                                                Delete
                                            </button>

                                        </div>
                                    </>

                                )}

                            </div>

                        ))}

                    </div>

                </section>


                {/* Appointments comes next */}
                <section className="appointments-section">

                    <h2>My Appointments</h2>

                    <p>
                        View appointment details and approval status.
                    </p>


                    {appointments.length === 0 ? (

                        <div className="no-appointments">
                            No appointments yet.
                        </div>

                    ) : (

                        <div className="appointments-table-wrapper">

                            <table className="appointments-table">

                                <thead>
                                    <tr>
                                        <th>Pet</th>
                                        <th>Service</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Price</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {appointments.map((appointment) => (

                                        <tr key={appointment.id}>

                                            <td>
                                                {appointment.pet_species}
                                            </td>

                                            <td>
                                                {appointment.service_name}
                                            </td>

                                            <td>
                                                {new Date(
                                                    appointment.appointment_date
                                                ).toLocaleDateString()}
                                            </td>

                                            <td>
                                                {appointment.appointment_time}
                                            </td>

                                            <td>
                                                {appointment.service_price} JD
                                            </td>

                                            <td>
                                                <span
                                                    className={`appointment-status ${appointment.status}`}
                                                >
                                                    {appointment.status}
                                                </span>
                                            </td>

                                            <td>

                                                {appointment.status === "pending" && (

                                                    <button
                                                        className="small-outline-btn"
                                                        onClick={() =>
                                                            handleCancelAppointment(
                                                                appointment.id
                                                            )
                                                        }
                                                    >
                                                        Cancel
                                                    </button>

                                                )}

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    )}

                </section>

            </main>

            <Footer />

        </div>
    );
};

export default Profile;