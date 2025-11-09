/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import axios from "axios";
import logo from "../assets/logo.png";
import "../App.css"; 

const Admindash = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [stats, setStats] = useState({});
    const [sidebarOpen, setSidebarOpen] = useState(false);

    async function getall() {
        const response = await axios.get("http://localhost:8000/api/admin/stats");
        if (response.data.msg === "Success") {
        setStats(response.data.value);
        }
    }

    function validation() {
        const data = localStorage.getItem("admin");
        if (data !== "admin@gmail.com") {
        navigate("/admin");
        }
    }

    useEffect(() => {
        validation();
        getall();
    }, []);

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

            <img
                src={logo}
                alt="Logo"
                height="48"
                style={{ borderRadius: "6px" }}
            />
            <h4 className="fw-bold mb-0"> ADMIN DASHBOARD</h4>
            </div>

            <div className="d-flex align-items-center gap-3" style={{ zIndex: 3100 }}>
            <Link to="/" className="btn btn btn-primary btn-sm fw-semibold px-3">
                Home
            </Link>
            <button
                onClick={() => {
                localStorage.removeItem("admin");
                validation();
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
                DASHBOARD OVERVIEW
            </h4>

            <div className="container">
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                <Card title="Doctors" value={stats.d} gradient="#1976d2,#42a5f5" />
                <Card title="Patients" value={stats.p} gradient="#0288d1,#26c6da" />
                <Card title="Appointments" value={stats.a} gradient="#1565c0,#64b5f6" />
                <Card
                    title="Pending Appointments"
                    value={stats.pena}
                    gradient="#3949ab,#5c6bc0"
                />
                <Card title="Feedback" value={stats.f} gradient="#00796b,#26a69a" />
                <Card title="Suggestions" value={stats.s} gradient="#6a1b9a,#ab47bc" />
                <Card title="Complaints" value={stats.c} gradient="#c62828,#ef5350" />
                <Card title="News" value={stats.n} gradient="#283593,#3f51b5" />
                </div>
            </div>
            </main>
        </div>
        </div>
    );
    };

    const Card = ({ title, value, gradient }) => (
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
            <h3 className="card-title fw-bold">{value ?? 0}</h3>
            <p className="card-text fw-semibold">{title}</p>
        </div>
        </div>
    </div>
);

export default Admindash;
