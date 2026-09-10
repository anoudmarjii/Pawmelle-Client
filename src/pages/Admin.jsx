import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Footer from "../components/Footer";
import "./Admin.css";

const BASE_URL = import.meta.env.VITE_SERVER_URL;

const Admin = () => {

    const [users, setUsers] = useState([]);
    const [appointments, setAppointments] = useState([]);

    const [activeSection, setActiveSection] = useState("dashboard");

    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();


    // =========================
    // LOAD ADMIN DATA
    // =========================

    useEffect(() => {

        // First make sure the logged-in user is an admin
        axios
            .get(
                `${BASE_URL}/api/auth/me`,
                {
                    withCredentials: true
                }
            )
            .then((response) => {

                if (response.data.user.role !== "admin") {
                    navigate("/");
                    return;
                }


                return Promise.all([
                    axios.get(
                        `${BASE_URL}/api/users`,
                        {
                            withCredentials: true
                        }
                    ),

                    axios.get(
                        `${BASE_URL}/api/appointments/admin/all`,
                        {
                            withCredentials: true
                        }
                    )
                ]);
            })
            .then((responses) => {

                if (!responses) {
                    return;
                }

                const [usersResponse, appointmentsResponse] = responses;

                setUsers(usersResponse.data);
                setAppointments(appointmentsResponse.data);

                setLoading(false);
            })
            .catch((error) => {

                console.error(error);

                if (
                    error.response?.status === 401 ||
                    error.response?.status === 403
                ) {
                    navigate("/login");
                }

                setLoading(false);
            });

    }, [navigate]);


    // =========================
    // DELETE USER
    // =========================

    const handleDeleteUser = (userId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmDelete) {
            return;
        }

        axios
            .delete(
                `${BASE_URL}/api/users/${userId}`,
                {
                    withCredentials: true
                }
            )
            .then(() => {

                setUsers((previousUsers) =>
                    previousUsers.filter(
                        (user) => user.id !== userId
                    )
                );

                setMessage("User deleted successfully");
            })
            .catch((error) => {

                console.error(error);

                setMessage(
                    error.response?.data?.message ||
                    "Could not delete user"
                );
            });
    };


    // =========================
    // APPOINTMENT STATUS
    // =========================

    const handleAppointmentStatus = (
        appointmentId,
        newStatus
    ) => {

        axios
            .put(
                `${BASE_URL}/api/appointments/${appointmentId}/status`,
                {
                    status: newStatus
                },
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
                                status:
                                    response.data.appointment.status
                            }
                            : appointment
                    )
                );

                setMessage(
                    `Appointment ${newStatus} successfully`
                );
            })
            .catch((error) => {

                console.error(error);

                setMessage(
                    error.response?.data?.message ||
                    "Could not update appointment"
                );
            });
    };


    // =========================
    // LOGOUT
    // =========================

    const handleLogout = () => {

        axios
            .post(
                    `${BASE_URL}/api/auth/logout`,
                {},
                {
                    withCredentials: true
                }
            )
            .then(() => {
                navigate("/");
            })
            .catch((error) => {
                console.error(error);
            });
    };


    // =========================
    // STATISTICS
    // =========================

    const now = new Date();

    const appointmentsThisMonth =
        appointments.filter((appointment) => {

            const date =
                new Date(appointment.appointment_date);

            return (
                date.getMonth() === now.getMonth() &&
                date.getFullYear() === now.getFullYear()
            );
        });


    const pendingAppointments =
        appointments.filter(
            (appointment) =>
                appointment.status === "pending"
        );


    const acceptedAppointments =
        appointments.filter(
            (appointment) =>
                appointment.status === "accepted"
        );


    const registeredUsers =
        users.filter(
            (user) => user.role === "user"
        );


    if (loading) {
        return (
            <p className="admin-loading">
                Loading dashboard...
            </p>
        );
    }


    return (
        <div className="admin-page">


            <div className="admin-layout">


                {/* =========================
                    SIDEBAR
                ========================= */}

                <aside className="admin-sidebar">

                    <div>

                        <h2 className="admin-logo">
                            PAWMELLE
                        </h2>


                        <nav className="admin-nav">

                            <button
                                className={
                                    activeSection === "dashboard"
                                        ? "admin-nav-btn active"
                                        : "admin-nav-btn"
                                }
                                onClick={() =>
                                    setActiveSection("dashboard")
                                }
                            >
                                Dashboard
                            </button>


                            <button
                                className={
                                    activeSection === "users"
                                        ? "admin-nav-btn active"
                                        : "admin-nav-btn"
                                }
                                onClick={() =>
                                    setActiveSection("users")
                                }
                            >
                                Users
                            </button>

                        </nav>

                    </div>


                    <button
                        className="admin-logout"
                        onClick={handleLogout}
                    >
                        Log Out
                    </button>

                </aside>



                {/* =========================
                    MAIN CONTENT
                ========================= */}

                <main className="admin-main">


                    {message && (

                        <div
                            className="alert alert-success"
                            role="alert"
                        >
                            {message}
                        </div>

                    )}



                    {/* =====================
                        DASHBOARD
                    ===================== */}

                    {activeSection === "dashboard" && (

                        <>

                            <div className="admin-heading">

                                <div>

                                    <h1>
                                        Welcome Back, Admin
                                    </h1>

                                    <p>
                                        Here is what is happening
                                        with Pawmelle today.
                                    </p>

                                </div>

                                <span className="admin-name">
                                    Admin
                                </span>

                            </div>



                            {/* STATISTICS */}

                            <section className="admin-stats">


                                <div className="stat-card">

                                    <p>
                                        Bookings This Month
                                    </p>

                                    <h2>
                                        {
                                            appointmentsThisMonth.length
                                        }
                                    </h2>

                                    <span>
                                        This month
                                    </span>

                                </div>


                                <div className="stat-card">

                                    <p>
                                        Pending Approval
                                    </p>

                                    <h2>
                                        {
                                            pendingAppointments.length
                                        }
                                    </h2>

                                    <span>
                                        Waiting for approval
                                    </span>

                                </div>


                                <div className="stat-card">

                                    <p>
                                        Approved Appointments
                                    </p>

                                    <h2>
                                        {
                                            acceptedAppointments.length
                                        }
                                    </h2>

                                    <span>
                                        Total approved
                                    </span>

                                </div>


                                <div className="stat-card">

                                    <p>
                                        Registered Users
                                    </p>

                                    <h2>
                                        {
                                            registeredUsers.length
                                        }
                                    </h2>

                                    <span>
                                        Total users
                                    </span>

                                </div>

                            </section>



                            {/* APPOINTMENTS */}

                            <section className="admin-appointments">

                                <div className="admin-section-heading">

                                    <h2>
                                        Appointment Requests
                                    </h2>

                                    <p>
                                        Review and manage submitted
                                        bookings.
                                    </p>

                                </div>


                                <div className="admin-table-wrapper">

                                    <table className="admin-table">

                                        <thead>

                                            <tr>
                                                <th>Customer</th>
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

                                            {appointments.length === 0 ? (

                                                <tr>

                                                    <td
                                                        colSpan="8"
                                                        className="admin-empty"
                                                    >
                                                        No appointments found.
                                                    </td>

                                                </tr>

                                            ) : (

                                                appointments.map(
                                                    (appointment) => (

                                                        <tr
                                                            key={
                                                                appointment.id
                                                            }
                                                        >

                                                            <td className="customer-name">
                                                                {
                                                                    appointment.customer_name
                                                                }
                                                            </td>


                                                            <td>
                                                                {
                                                                    appointment.pet_species
                                                                }

                                                                {appointment.pet_breed &&
                                                                    ` - ${appointment.pet_breed}`}
                                                            </td>


                                                            <td>
                                                                {
                                                                    appointment.service_name
                                                                }
                                                            </td>


                                                            <td>
                                                                {new Date(
                                                                    appointment.appointment_date
                                                                ).toLocaleDateString()}
                                                            </td>


                                                            <td>
                                                                {
                                                                    appointment.appointment_time
                                                                }
                                                            </td>


                                                            <td>
                                                                {
                                                                    appointment.service_price
                                                                }{" "}
                                                                JD
                                                            </td>


                                                            <td>

                                                                <span
                                                                    className={`admin-status ${appointment.status}`}
                                                                >
                                                                    {
                                                                        appointment.status
                                                                    }
                                                                </span>

                                                            </td>


                                                            <td>

                                                                {appointment.status ===
                                                                    "pending" && (

                                                                        <div className="appointment-actions">

                                                                            <button
                                                                                className="approve-btn"
                                                                                onClick={() =>
                                                                                    handleAppointmentStatus(
                                                                                        appointment.id,
                                                                                        "accepted"
                                                                                    )
                                                                                }
                                                                            >
                                                                                Approve
                                                                            </button>


                                                                            <button
                                                                                className="reject-btn"
                                                                                onClick={() =>
                                                                                    handleAppointmentStatus(
                                                                                        appointment.id,
                                                                                        "rejected"
                                                                                    )
                                                                                }
                                                                            >
                                                                                Decline
                                                                            </button>

                                                                        </div>

                                                                    )}

                                                            </td>

                                                        </tr>

                                                    )
                                                )

                                            )}

                                        </tbody>

                                    </table>

                                </div>

                            </section>

                        </>

                    )}



                    {/* =====================
                        USERS
                    ===================== */}

                    {activeSection === "users" && (

                        <section className="admin-users">


                            <div className="admin-section-heading users-heading">

                                <h1>
                                    Users
                                </h1>

                                <p>
                                    View and manage registered Pawmelle users.
                                </p>

                            </div>


                            <div className="admin-table-wrapper">

                                <table className="admin-table users-table">

                                    <thead>

                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Role</th>
                                            <th>Actions</th>
                                        </tr>

                                    </thead>


                                    <tbody>

                                        {users.length === 0 ? (

                                            <tr>

                                                <td
                                                    colSpan="6"
                                                    className="admin-empty"
                                                >
                                                    No users found.
                                                </td>

                                            </tr>

                                        ) : (

                                            users.map((user) => (

                                                <tr key={user.id}>

                                                    <td>
                                                        {user.id}
                                                    </td>

                                                    <td className="customer-name">
                                                        {user.name}
                                                    </td>

                                                    <td>
                                                        {user.email}
                                                    </td>

                                                    <td>
                                                        {user.phone || "-"}
                                                    </td>

                                                    <td>

                                                        <span className="user-role">
                                                            {user.role}
                                                        </span>

                                                    </td>

                                                    <td>

                                                        {user.role !== "admin" && (

                                                            <button
                                                                className="delete-user-btn"
                                                                onClick={() =>
                                                                    handleDeleteUser(
                                                                        user.id
                                                                    )
                                                                }
                                                            >
                                                                Delete
                                                            </button>

                                                        )}

                                                    </td>

                                                </tr>

                                            ))

                                        )}

                                    </tbody>

                                </table>

                            </div>

                        </section>

                    )}


                </main>

            </div>


            <Footer />

        </div>
    );
};

export default Admin;