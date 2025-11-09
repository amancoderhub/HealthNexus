/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import axios from "axios";
import logo from "../assets/logo.png";
import "../App.css";

const Pfeed = () => {
    const [type, setType] = useState("");
    const [msg, setMsg] = useState("");
    const [feeds, setFeeds] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const validation = () => {
        const data = localStorage.getItem("patient");
        if (data == null) navigate("/login");
    };

    const loadFeedbacks = async () => {
        try {
        const user = JSON.parse(localStorage.getItem("patient"));
        if (!user?._id) return;
        const res = await axios.get(
            `https://healthnexus-backend-53ei.onrender.com/api/feed/user/patient/${user._id}`
        );
        if (res.data.msg === "Success") setFeeds(res.data.value);
        } catch (err) {
        console.error(err);
        }
    };

    const addfeed = async (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem("patient"));
        const feed = {
        uid: user._id,
        utype: "patient",
        type,
        msg,
        status: "u",
        };
        try {
        const response = await axios.post("http://localhost:8000/api/feed", feed);
        if (response.data.msg === "Success") {
            alert("Feedback Added Successfully");
            setType("");
            setMsg("");
            loadFeedbacks();
        } else {
            alert("Something went wrong");
        }
        } catch (err) {
        console.error(err);
        alert("Server error");
        }
    };

    const deleteFeed = async (id) => {
        if (!window.confirm("Are you sure you want to delete this feedback?")) return;
        try {
        const res = await axios.delete(`http://localhost:8000/api/feed/${id}`);
        if (res.data.msg === "Success") {
            alert("Feedback deleted successfully");
            loadFeedbacks();
        } else {
            alert("Failed to delete feedback");
        }
        } catch (err) {
        console.error(err);
        alert("Server error while deleting feedback");
        }
    };

    useEffect(() => {
        validation();
        loadFeedbacks();
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
            <h4 className="my-4 text-center fw-bold text-dark fs-1">Patient Feedback</h4>

            <div
                className="col-md-8  mx-auto p-4 rounded-4 shadow-lg"
                style={{ background: "#a6c3e4ff" }}
            >
                <img src={logo} alt="logo" height="50" className="text-center mb-4" />
                <h5 className="text-center mb-4 fw-bold">Add Feedback</h5>
                <form onSubmit={addfeed}>
                <label className="fw-semibold">Select Type</label>
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="form-control rounded-pill px-3 mb-3"
                    required
                >
                    <option value="">--Select--</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Suggestion">Suggestion</option>
                    <option value="Complain">Complain</option>
                </select>

                <label className="fw-semibold">Message</label>
                <textarea
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    className="form-control mb-3"
                    rows="4"
                    style={{ borderRadius: "15px", padding: "10px" }}
                    required
                ></textarea>

                <button
                    type="submit"
                    className="btn btn-primary w-100 fw-semibold py-2 rounded-pill"
                >
                    Add Feedback
                </button>
                </form>
            </div>

            <div className="col-md-8 mx-auto mt-5">
                <h5 className="fw-semibold text-center mb-3">Your Feedbacks</h5>
                {feeds.length > 0 ? (
                feeds.map((f) => (
                    <div
                    key={f._id}
                    className="border rounded p-3 my-2 d-flex justify-content-between align-items-center shadow-sm"
                    style={{
                        background: "#b6c5ecff",
                        borderLeft: "5px solid #4f9dfc",
                    }}
                    >
                    <div>
                        <strong>{f.type}</strong>
                        <p className="mb-0">{f.msg}</p>
                    </div>
                    <button
                        onClick={() => deleteFeed(f._id)}
                        className="btn btn-sm btn-danger"
                    >
                        Delete
                    </button>
                    </div>
                ))
                ) : (
                <p className="text-center text-muted mt-3">No feedback added yet.</p>
                )}
            </div>
            </main>
        </div>
        </div>
    );
};

export default Pfeed;
