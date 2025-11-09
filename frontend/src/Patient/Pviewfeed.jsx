/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import axios from "axios";
import logo from "../assets/logo.png";
import "../App.css";

const Pviewfeed = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [feedback, setFeedback] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const getfeed = async () => {
        try {
        const userData =
            localStorage.getItem("patient") || localStorage.getItem("doctor");
        if (!userData) return;

        const parsedUser = JSON.parse(userData);
        const uid = parsedUser._id;

        const response = await axios.get(`http://localhost:8000/api/feed/u/${uid}`);

        if (response.data.msg === "Success") {
            setFeedback(response.data.value);
        }
        } catch (error) {
        console.error("Error fetching feedback:", error);
        }
    };

    const deleteFeed = async (id) => {
        if (window.confirm("Are you sure you want to delete this feedback?")) {
        try {
            const response = await axios.delete(`http://localhost:8000/api/feed/${id}`);
            if (response.data.msg === "Success") {
            alert("✅ Feedback deleted successfully!");
            getfeed();
            } else {
            alert("⚠️ Failed to delete feedback!");
            }
        } catch (error) {
            console.error("Error deleting feedback:", error);
            alert("❌ Something went wrong while deleting!");
        }
        }
    };

    const validation = () => {
        const data = localStorage.getItem("patient");
        if (data == null) {
        navigate("/login");
        }
    };

    useEffect(() => {
        validation();
        getfeed();
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
        { to: "/pdash", text: "Dashboard" },
        { to: "/papp", text: "Appointment" },
        { to: "/preqapp", text: "Request Appointment" },
        { to: "/pfeed", text: "Patient Feedback" },
        { to: "/pviewfeed", text: "Patient View Feedback" },
    ];

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
            <h4 className="fw-bold mb-0">PATIENT DASHBOARD</h4>
            </div>

            <div className="d-flex align-items-center gap-3" style={{ zIndex: 3100 }}>
            <Link to="/" className="btn btn-primary btn-sm fw-semibold px-3">
                Home
            </Link>
            <button
                onClick={() => {
                localStorage.removeItem("patient");
                localStorage.removeItem("role");
                navigate("/login");
                }}
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
            <h4 className="my-4 text-center fw-bold text-dark fs-1">View Feedback</h4>

            <div className="rounded-4 shadow-sm p-4" style={{ background: "#c2daf5ff" }}>
                <div className="table-responsive" style={{ background: "#c9def7ff" }}>
                <table className="table table-bordered table-hover align-middle">
                    <thead className="table-dark text-center">
                    <tr>
                        <th>S.No</th>
                        <th>Feedback Type</th>
                        <th>Message</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody className="text-center">
                    {feedback.length > 0 ? (
                        feedback.map((item, index) => (
                        <tr key={item._id}>
                            <td>{index + 1}</td>
                            <td>{item.type}</td>
                            <td>{item.msg}</td>
                            <td>
                            <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => deleteFeed(item._id)}
                            >
                                🗑️ Delete
                            </button>
                            </td>
                        </tr>
                        ))
                    ) : (
                        <tr>
                        <td colSpan="4" className="text-muted">
                            No Feedback Found
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

export default Pviewfeed;
