import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import axios from "axios";
import logo from "../assets/logo.png";
import "../App.css";

const Preqapp = () => {
    const [doctors, setDoctors] = useState([]);
    const [spe, setSpe] = useState("");
    const [fdoc, setFdoc] = useState([]);
    const [did, setDid] = useState("");
    const [pid, setPid] = useState("");
    const [date, setDate] = useState("");
    const [slot, setSlot] = useState("");
    const [desc, setDesc] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const resetForm = () => {
        setSpe("");
        setDid("");
        setDate("");
        setSlot("");
        setDesc("");
    };

    const reqapp = async (e) => {
        e.preventDefault();
        if (!pid || !did || !date || !slot || !desc.trim()) {
        return window.alert("Please fill all fields before submitting");
        }

        const data = { pid, did, date, slot, desc };
        try {
        const response = await axios.post("http://localhost:8000/api/app", data);
        if (response.data.msg === "Success") {
            window.alert("Appointment Request Sent ✅");
            resetForm();
        } else {
            window.alert("Something went wrong ⚠️");
        }
        } catch (err) {
        console.error("Error submitting appointment:", err);
        window.alert("Server error ❌ Please try again.");
        }
    };

    const getdoc = useCallback(async () => {
        try {
        const response = await axios.get("http://localhost:8000/api/doctor");
        if (response.data.msg.toLowerCase() === "success") {
            setDoctors(response.data.value);
            setFdoc(response.data.value);
        }
        } catch (err) {
        console.error("Error fetching doctors:", err);
        }
    }, []);

    const validation = useCallback(() => {
        const data = localStorage.getItem("patient");
        if (!data) {
        navigate("/login");
        } else {
        try {
            const patient = JSON.parse(data);
            setPid(patient._id);
        } catch {
            console.error("Invalid patient data in localStorage");
            navigate("/login");
        }
        }
    }, [navigate]);

    const filterdoc = (e) => {
        const value = e.target.value;
        setSpe(value);
        if (!value) setFdoc(doctors);
        else {
        const doc = doctors.filter(
            (d) => d.spe.trim().toLowerCase() === value.trim().toLowerCase()
        );
        setFdoc(doc);
        }
    };

    useEffect(() => {
        validation();
        getdoc();
    }, [validation, getdoc]);

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

    const specialties = [...new Set(doctors.map((d) => d.spe.trim()))];

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
                Request Appointment
            </h4>

            <div
                className="col-md-8 mx-auto p-5 rounded-4 shadow-lg"
                style={{ background: "#a0c1e6ff" }}
            >   
                <img src={logo} alt="Logo" height="50" className="text-center mb-4" />
                <h5 className="text-center mb-4 fw-bold">Appointment Details</h5>
                <form onSubmit={reqapp}>
                <label className="fw-semibold">Select Specialty</label>
                <select
                    onChange={filterdoc}
                    value={spe}
                    className="form-control rounded-pill px-3 mb-3"
                >
                    <option value="">--Select--</option>
                    {specialties.map((specialty, idx) => (
                    <option key={idx} value={specialty}>
                        {specialty}
                    </option>
                    ))}
                </select>

                <label className="fw-semibold">Select Doctor</label>
                <select
                    className="form-control rounded-pill px-3 mb-3"
                    value={did}
                    onChange={(e) => setDid(e.target.value)}
                >
                    <option value="">--Select Doctor--</option>
                    {fdoc.map((d) => (
                    <option key={d._id} value={d._id}>
                        Dr. {d.name} / {d.spe}
                    </option>
                    ))}
                </select>

                <label className="fw-semibold">Select Date</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="form-control rounded-pill px-3 mb-3"
                />

                <label className="fw-semibold">Select Slot</label>
                <select
                    className="form-control rounded-pill px-3 mb-3"
                    value={slot}
                    onChange={(e) => setSlot(e.target.value)}
                >
                    <option value="">--Select Slot--</option>
                    <option value="morning">Morning (9am - 12pm)</option>
                    <option value="afternoon">Afternoon (12pm - 4pm)</option>
                    <option value="evening">Evening (4pm - 7pm)</option>
                </select>

                <label className="fw-semibold">Describe Your Problem</label>
                <textarea
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className="form-control mb-3"
                    rows="4"
                    style={{ borderRadius: "15px", padding: "10px" }}
                ></textarea>

                <button
                    type="submit"
                    className="btn btn-primary w-100 fw-semibold py-2 rounded-pill"
                >
                    Request Appointment
                </button>
                </form>
            </div>
            </main>
        </div>
        </div>
    );
};

export default Preqapp;
