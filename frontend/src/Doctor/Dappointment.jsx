import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import axios from "axios";
import logo from "../assets/logo.png";
import "../App.css";

const Dappointment = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [appointments, setAppointments] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const fetchAppointments = useCallback(async () => {
        try {
        const data = localStorage.getItem("doctor");
        if (!data) return;
        const doctor = JSON.parse(data);
        const response = await axios.get(
            `http://localhost:8000/api/app/d/${doctor._id}`
        );
        if (response.data.msg === "Success") {
            const newdata = response.data.value.filter(
            (d) => d.status === "pending"
            );
            setAppointments(newdata);
        } else {
            setAppointments([]);
        }
        } catch (err) {
        console.error("Error fetching appointments:", err);
        }
    }, []);

    useEffect(() => {
        const data = localStorage.getItem("doctor");
        if (!data) {
        navigate("/login");
        return;
        }
        fetchAppointments();
    }, [navigate, fetchAppointments]);

    const handleUpdateStatus = async (id, status) => {
        try {
        await axios.put(`http://localhost:8000/api/app/${id}`, { status });
        setAppointments((prev) => prev.filter((app) => app._id !== id));
        alert(`Appointment ${status}`);
        } catch (err) {
        console.error("Error updating appointment:", err);
        alert("Failed to update appointment");
        }
    };
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

    const links = [
        { to: "/ddash", text: "Dashboard" },
        { to: "/penapp", text: "Pending Appointment" },
        { to: "/conapp", text: "Confirmed Appointment" },
        { to: "/canapp", text: "Cancelled Appointment" },
        { to: "/comapp", text: "Completed Appointment" },
    ];

    return (
        <div className="vh-100 d-flex flex-column" style={{ background: "#dae5f9ff" }}>
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
            <h4 className="fw-bold mb-0">DOCTOR DASHBOARD</h4>
            </div>

            <div className="d-flex align-items-center gap-3" style={{ zIndex: 3100 }}>
            <Link to="/" className="btn btn-primary btn-sm fw-semibold px-3">
                Home
            </Link>
            <button
                onClick={() => {
                localStorage.removeItem("doctor");
                navigate("/login");
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
                        border: "1px solid #e0e7ff",
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
                Pending Appointments
            </h4>

            <div
                className="rounded-4 shadow-sm p-4"
                style={{ background: "#a7bedaff" }}
            >
                <div className="table-responsive" style={{ background: "#9ebcdfff" }}>
                <table className="table table-bordered table-hover align-middle">
                    <thead className="table-dark text-center">
                    <tr>
                        <th>#</th>
                        <th>Patient</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Date</th>
                        <th>Slot</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody className="text-center">
                    {appointments.length > 0 ? (
                        appointments.map((app, idx) => (
                        <tr key={app._id}>
                            <td>{idx + 1}</td>
                            <td>{app.pid ? app.pid.name : "N/A"}</td>
                            <td>{app.pid ? app.pid.age : "N/A"}</td>
                            <td>{app.pid ? app.pid.gender : "N/A"}</td>
                            <td>{app.date}</td>
                            <td>{app.slot}</td>
                            <td>{app.desc}</td>
                            <td>
                            <span className="badge bg-warning">{app.status}</span>
                            </td>
                            <td>
                            <button
                                type="button"
                                className="btn btn-sm btn-success me-2"
                                onClick={() =>
                                handleUpdateStatus(app._id, "approved")
                                }
                            >
                                Approve
                            </button>
                            <button
                                type="button"
                                className="btn btn-sm btn-danger"
                                onClick={() =>
                                handleUpdateStatus(app._id, "rejected")
                                }
                            >
                                Reject
                            </button>
                            </td>
                        </tr>
                        ))
                    ) : (
                        <tr>
                        <td colSpan="9" className="text-muted">
                            No Pending Appointments
                        </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                </div>
            </div>
            </main>
        </div>
        </div>
    );
};

export default Dappointment;
