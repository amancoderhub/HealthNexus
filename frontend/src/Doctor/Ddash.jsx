/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import axios from "axios";
import logo from "../assets/logo.png";
import "../App.css";

const Ddash = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [stats, setStats] = useState({
        a: 0,
        pena: 0,
        cona: 0,
        cana: 0,
        coma: 0,
        f: 0,
        s: 0,
        c: 0,
    });
    const [loading, setLoading] = useState(true);

    const getDoctorId = () => {
        const data = localStorage.getItem("doctor");
        if (!data) {
        navigate("/login");
        return null;
        }
        try {
        const parsed = JSON.parse(data);
        return parsed._id;
        } catch (error) {
        navigate("/login");
        return null;
        }
    };

    const getAll = async () => {
        const id = getDoctorId();
        if (!id) return;
        try {
        setLoading(true);
        const response = await axios.get(
            `https://healthnexus-backend-53ei.onrender.com/api/doctor/stats/${id}`
        );
        if (response.data.msg === "Success") {
            setStats((prev) => ({
            ...prev,
            ...response.data.value,
            }));
        }
        } catch (error) {
        console.error("Error fetching stats:", error);
        } finally {
        setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("doctor");
        navigate("/login");
    };

    useEffect(() => {
        getAll();
    }, []);

    // Sidebar Responsiveness
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

    const StatCard = ({ title, value, gradient }) => (
        <div className="col">
        <div
            className="card text-center shadow border-0 h-100"
            style={{
            background: `linear-gradient(135deg, ${gradient})`,
            color: "#fff",
            borderRadius: "14px",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.03)";
            e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.25)";
            }}
            onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
            }}
        >
            <div className="card-body">
            <h3 className="card-title fw-bold">{value}</h3>
            <p className="card-text fw-semibold">{title}</p>
            </div>
        </div>
        </div>
    );

    return (
        <div className="vh-100 d-flex flex-column" style={{ background: "#e8f0ff" }}>
        {/* Header */}
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
                onClick={handleLogout}
                className="btn btn-danger btn-sm px-3 fw-semibold"
            >
                Logout
            </button>
            </div>
        </header>

        {/* Layout */}
        <div
            className="d-flex flex-grow-1 position-relative"
            style={{ marginTop: "9vh", overflow: "hidden" }}
        >
            {/* Sidebar */}
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

            {/* Overlay for Mobile */}
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

            {/* Main Content */}
            <main
            className="flex-grow-1 bg-white p-4 overflow-auto rounded-top-start-4 shadow-sm"
            style={{
                marginLeft: window.innerWidth >= 992 ? "250px" : "0",
                transition: "margin-left 0.4s ease-in-out",
                zIndex: 1000,
            }}
            >
            <h4 className="my-4 text-center fw-bold text-dark fs-1">
                Dashboard Overview
            </h4>

            {loading ? (
                <div className="text-center my-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                </div>
            ) : (
                <div className="container py-5">
                {Object.values(stats).every((v) => v === 0) ? (
                    <h5 className="text-center text-muted">No data available</h5>
                ) : (
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                    <StatCard
                        title="Total Appointments"
                        value={stats.a}
                        gradient="#00c6ff,#0072ff"
                    />
                    <StatCard
                        title="Pending Appointments"
                        value={stats.pena}
                        gradient="#3949ab,#5c6bc0"
                    />
                    <StatCard
                        title="Confirmed Appointments"
                        value={stats.cona}
                        gradient="#43e97b,#38f9d7"
                    />
                    <StatCard
                        title="Cancelled Appointments"
                        value={stats.cana}
                        gradient="#ff512f,#dd2476"
                    />
                    <StatCard
                        title="Completed Appointments"
                        value={stats.coma}
                        gradient="#396afc,#2948ff"
                    />
                    <StatCard
                        title="Feedback"
                        value={stats.f}
                        gradient="#11998e,#38ef7d"
                    />
                    <StatCard
                        title="Suggestions"
                        value={stats.s}
                        gradient="#a770ef,#cf8bf3,#fdb99b"
                    />
                    <StatCard
                        title="Complaints"
                        value={stats.c}
                        gradient="#ff6a00,#ee0979"
                    />
                    </div>
                )}
                </div>
            )}
            </main>
        </div>
        </div>
    );
};

export default Ddash;
