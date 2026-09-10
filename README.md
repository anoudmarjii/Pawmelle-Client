# 🐾 Pawmelle Frontend (React)

This is the frontend for **Pawmelle**, a pet care and appointment booking web application built using **React + Vite**.

Pawmelle allows pet owners to manage their pets, browse available pet care services, book appointments, and track their appointment status. It also provides an admin dashboard for managing users and appointment requests.

---

## 🎯 Description

The application supports two types of users:

- 👤 **Regular Users:**
  - Sign up and log in
  - View and update their profile information
  - Add, edit, and delete pets
  - Browse available pet care services
  - Book appointments for their pets
  - View their appointments and appointment status
  - Cancel pending appointments
  - View the current weather in Amman using an external API

- 🛠️ **Admins:**
  - Log in using an admin account
  - View dashboard statistics
  - View registered users
  - Delete users
  - View all appointment requests
  - Approve or reject pending appointments

Authentication is handled using sessions and cookies through the Pawmelle backend.

---

## 🙋 User Requirements

1. Users can **Sign Up** by providing their personal and pet information.
2. Users can **Log In** using their email and password.
3. Regular users can:
   - Manage their profile information.
   - Add, edit, and delete pets.
   - Browse available services.
   - Select a pet and service when booking an appointment.
   - Choose an appointment date and time.
   - View all of their appointments.
   - Cancel pending appointments.
4. Admin users can:
   - Access the admin dashboard.
   - View application statistics.
   - View and delete registered users.
   - View all appointment requests.
   - Approve or reject pending appointments.
5. The application uses role-based access so regular users cannot access admin functionality.
6. The application provides a responsive interface for desktop, tablet, and mobile devices.
7. Current weather information for Amman is retrieved from an external API.

---

## 🛠️ Technologies Used

- React
- Vite
- JavaScript
- HTML5
- CSS3
- React Router DOM
- Axios
- Bootstrap
- Open-Meteo API
- REST API integration
- Cookie-based session authentication

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <frontend-repository-url>
```

### 2. Navigate to the Project Folder

```bash
cd Client
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Backend

The Pawmelle backend must be running before using features such as login, pets, services, appointments, and the admin dashboard.

The frontend currently communicates with the backend at:

```text
${BASE_URL}
```

### 5. Start the Frontend

```bash
npm run dev
```

### 6. Open the Application

Vite will provide a local development URL, usually:

```text
http://localhost:5173
```

Open this URL in your browser to use Pawmelle.

---

## 📁 Main Pages

- Home
- Sign In
- Sign Up
- User Profile
- Book Appointment
- Admin Dashboard

---

## 🔗 Backend

This frontend communicates with the **Pawmelle Server** REST API for authentication, user management, pet management, services, and appointments.

The backend should be running on:

```text
${BASE_URL}
```