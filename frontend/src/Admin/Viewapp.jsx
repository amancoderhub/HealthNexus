import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import axios from "axios";
import logo from "../assets/logo.png";
import "../App.css";

const Viewapp = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [appointments, setAppointments] = useState([]);
    const [filter, setFilter] = useState("all");

    const links = [
        { to: "/admindash", text: "Dashboard" },
        { to: "/addoc", text: "Add Doctor" },
        { to: "/viewdoc", text: "View Doctor" },
        { to: "/adpatient", text: "Add Patient" },
        { to: "/viewpatient", text: "View Patient" },
        { to: "/viewapp", text: "View Appointment" },
        { to: "/viewfeed", text: "View Feedback" },
        { to: "/viewenquiry", text: "View Enquiry" },
        { to: "/adnews", text: "Add News" },
    ];

    const validateAdmin = useCallback(() => {
        if (localStorage.getItem("admin") !== "admin@gmail.com") {
        navigate("/admin");
        }
    }, [navigate]);

    const fetchAppointments = useCallback(async () => {
        try {
        const response = await axios.get("http://localhost:8000/api/app");
        if (response.data.msg === "Success") {
            setAppointments(response.data.value);
        } else {
            setAppointments([]);
        }
        } catch (err) {
        console.error("Error fetching appointments:", err);
        setAppointments([]);
        }
    }, []);

    useEffect(() => {
        validateAdmin();
        fetchAppointments();
    }, [validateAdmin, fetchAppointments]);

    useEffect(() => {
        if (window.innerWidth < 992) setSidebarOpen(false);
        else setSidebarOpen(true);
        const handleResize = () => {
        if (window.innerWidth < 992) setSidebarOpen(false);
        else setSidebarOpen(true);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const filteredAppointments =
        filter === "all"
        ? appointments
        : appointments.filter((app) => app.status === filter);

    return (
        <div className="vh-100 d-flex flex-column" style={{ background: "#e8f0ff" }}>
        <header
            className="d-flex justify-content-between align-items-center px-4 shadow-sm"
            style={{
            height: "9vh",
            background: "linear-gradient(90deg, #1b52c7ff, #4f9dfc)",
            color: "#fff",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            zIndex: 3000,
            }}
        >
            <div className="d-flex align-items-center gap-3">
            <button
                className="btn text-white border-0 d-lg-none"
                onClick={() => setSidebarOpen(true)}
                style={{ zIndex: 3100 }}
            >
                <FaBars size={22} />
            </button>
            <img src={logo} alt="Logo" height="48" style={{ borderRadius: "6px" }} />
            <h4 className="fw-bold mb-0"> ADMIN DASHBOARD</h4>
            </div>

            <div className="d-flex align-items-center gap-3" style={{ zIndex: 3100 }}>
            <Link to="/" className="btn btn btn-primary btn-sm fw-semibold px-3">
                Home
            </Link>
            <button
                onClick={() => {
                localStorage.removeItem("admin");
                validateAdmin();
                }}
                className="btn btn-danger btn-sm px-3 fw-semibold"
            >
                Logout
            </button>
            </div>
        </header>

        <div
            className="d-flex flex-grow-1 position-relative"
            style={{ marginTop: "9vh", overflow: "hidden" }}
        >
            <aside
            className={`position-fixed h-100 shadow-lg sidebar ${
                sidebarOpen ? "open" : ""
            }`}
            style={{
                width: "250px",
                background: "linear-gradient(180deg, #6c8ab7ff, #dde9fcff)",
                borderRight: "2px solid #6a83adff",
                top: "9vh",
                left: 0,
                zIndex: 2500,
            }}
            >
            <div className="d-flex justify-content-end d-lg-none p-2">
                <button
                className="btn btn-sm btn-outline-danger fw-bold"
                onClick={() => setSidebarOpen(false)}
                style={{
                    borderRadius: "50%",
                    width: "34px",
                    height: "34px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                >
                <FaTimes />
                </button>
            </div>

            <div className="p-3 overflow-auto" style={{ height: "calc(91vh - 40px)" }}>
                <ul className="list-unstyled m-0">
                {links.map((link) => (
                    <li key={link.to} className="mb-2">
                    <Link
                        to={link.to}
                        className={`d-block py-2 px-3 rounded-3 fw-semibold text-center shadow-sm ${
                        location.pathname === link.to
                            ? "bg-primary text-white"
                            : "bg-white text-dark"
                        }`}
                        style={{
                        textDecoration: "none",
                        border: "1px solid #8593c0ff",
                        transition: "0.3s ease",
                        }}
                        onClick={() => {
                        if (window.innerWidth < 992) setSidebarOpen(false);
                        }}
                    >
                        {link.text}
                    </Link>
                    </li>
                ))}
                </ul>
            </div>
            </aside>

            <div
            onClick={() => setSidebarOpen(false)}
            className={`position-fixed top-0 start-0 w-100 h-100 overlay ${
                sidebarOpen && window.innerWidth < 992 ? "active" : ""
            }`}
            style={{
                background: "rgba(0,0,0,0.4)",
                zIndex: 2000,
            }}
            ></div>

            <main
            className="flex-grow-1 bg-white p-4 overflow-auto rounded-top-start-4 shadow-sm"
            style={{
                marginLeft: window.innerWidth >= 992 ? "250px" : "0",
                transition: "margin-left 0.4s ease-in-out",
                zIndex: 1000,
            }}
            >
            <h4 className="my-4 text-center fw-bold text-dark fs-1">
                VIEW APPOINTMENT
            </h4>

            <div className="col-md-11 p-5 rounded shadow-lg mx-auto table-responsive"
                style={{ background: "#a5c5edff" }}
            >
                <div className="text-center mb-4">
                <button
                    className={`btn btn-sm me-2 ${
                    filter === "all" ? "btn-dark" : "btn-outline-dark"
                    }`}
                    onClick={() => setFilter("all")}
                >
                    All
                </button>
                <button
                    className={`btn btn-sm me-2 ${
                    filter === "pending" ? "btn-warning" : "btn-outline-dark"
                    }`}
                    onClick={() => setFilter("pending")}
                >
                    Pending
                </button>
                <button
                    className={`btn btn-sm me-2 ${
                    filter === "approved" ? "btn-success" : "btn-outline-success"
                    }`}
                    onClick={() => setFilter("approved")}
                >
                    Approved
                </button>
                <button
                    className={`btn btn-sm me-2 ${
                    filter === "completed" ? "btn-primary" : "btn-outline-primary"
                    }`}
                    onClick={() => setFilter("completed")}
                >
                    Completed
                </button>
                <button
                    className={`btn btn-sm me-2 ${
                    filter === "rejected" ? "btn-danger" : "btn-outline-danger"
                    }`}
                    onClick={() => setFilter("rejected")}
                >
                    Rejected
                </button>
                </div>

                <table className="table table-light table-hover text-center align-middle">
                <thead className="table-dark text-center">
                    <tr>
                    <th>#</th>
                    <th>Doctor</th>
                    <th>Specialty</th>
                    <th>Patient</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Date</th>
                    <th>Slot</th>
                    <th>Description</th>
                    <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAppointments.length > 0 ? (
                    filteredAppointments.map((app, idx) => (
                        <tr key={app._id}>
                        <td>{idx + 1}</td>
                        <td>{app.did ? app.did.name : "N/A"}</td>
                        <td>{app.did ? app.did.spe : "N/A"}</td>
                        <td>{app.pid ? app.pid.name : "N/A"}</td>
                        <td>{app.pid ? app.pid.age : "N/A"}</td>
                        <td>{app.pid ? app.pid.gender : "N/A"}</td>
                        <td>{app.date}</td>
                        <td>{app.slot}</td>
                        <td>{app.desc}</td>
                        <td>
                            <span
                            className={`badge ${
                                app.status === "pending"
                                ? "bg-warning"
                                : app.status === "approved"
                                ? "bg-success"
                                : app.status === "completed"
                                ? "bg-primary"
                                : app.status === "rejected"
                                ? "bg-danger"
                                : "bg-secondary"
                            }`}
                            >
                            {app.status}
                            </span>
                        </td>
                        </tr>
                    ))
                    ) : (
                    <tr>
                        <td colSpan="10" className="text-center">
                        No Appointments Found
                        </td>
                    </tr>
                    )}
                </tbody>
                </table>
            </div>
            </main>
        </div>
        </div>
    );
};

export default Viewapp;
