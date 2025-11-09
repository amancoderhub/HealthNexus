/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import axios from "axios";
import "../App.css";
import logo from "../assets/logo.png";

const Adnews = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [news, setNews] = useState([]);

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

    useEffect(() => {
        const data = localStorage.getItem("admin");
        if (data !== "admin@gmail.com") navigate("/admin");
        getNews();
    }, []);

    async function getNews() {
        try {
        const res = await axios.get("http://localhost:8000/api/news");
        if (res.data.msg === "Success") setNews(res.data.value);
        } catch (err) {
        console.error(err);
        }
    }

    async function addNews(e) {
        e.preventDefault();
        try {
        const res = await axios.post("http://localhost:8000/api/news", { title, desc });
        if (res.data.msg === "Success") {
            alert(" News Added Successfully");
            setTitle("");
            setDesc("");
            getNews();
        } else alert(" Failed to Add News");
        } catch (err) {
        alert("Error: " + err.message);
        }
    }

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

    return (
        <div className="vh-100 d-flex flex-column" style={{ background: "#e8f0ff" }}>
        
        

        <header
            className="d-flex justify-content-between align-items-center px-4 shadow-sm"
            style={{
            height: "9vh",
            background: "linear-gradient(90deg, #2563eb, #4f9dfc)",
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
                height="52"
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
                navigate("/admin");
                }}
                className="btn btn-danger btn-sm px-3 fw-semibold"
            >
                Logout
            </button>
            </div>
        </header>

        {/* 🔹 Main Layout */}
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
                        border: "1px solid #3754b3ff",
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
            <h4 className="my-4 text-center fw-bold text-dark fs-1">ADD NEWS</h4>

            <div className="container d-flex justify-content-center">
                <form
                onSubmit={addNews}
                className="shadow p-5 rounded-4"
                style={{
                    background: "#9abae9ff",
                    width: "100%",
                    maxWidth: "550px",
                }}
                >
                <img src={logo} alt="logo" height="50" className="text-center mb-4" />
                <h5 className="text-center fw-bold mb-4">Add News</h5>

                <label className="fw-semibold">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter news title"
                    className="form-control rounded-pill mb-3"
                    required
                />

                <label className="fw-semibold">Description</label>
                <textarea
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Enter news description"
                    className="form-control rounded-3 mb-4"
                    rows="4"
                    required
                ></textarea>

                <div className="text-center">
                    <button
                    type="submit"
                    className="btn btn-primary rounded-pill px-4 fw-semibold"
                    >
                    Add News
                    </button>
                </div>
                </form>
            </div>

            <div
                className="container mt-5 shadow p-4 rounded-4"
                style={{ background: "#99b5e0ff", maxWidth: "850px" }}
            >
                <h5 className="text-center fw-bold mb-4">View All News</h5>
                {Array.isArray(news) && news.length > 0 ? (
                <div className="accordion accordion-flush" id="accordionFlushExample">
                    {news.map((n, i) => (
                    <div className="accordion-item mb-2" key={i}>
                        <h2 className="accordion-header" id={`flush-heading-${i}`}>
                        <button
                            className="accordion-button collapsed fw-semibold"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#flush-collapse-${i}`}
                        >
                            {n.title}
                        </button>
                        </h2>
                        <div
                        id={`flush-collapse-${i}`}
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionFlushExample"
                        >
                        <div className="accordion-body text-secondary">{n.desc}</div>
                        </div>
                    </div>
                    ))}
                </div>
                ) : (
                <p className="text-center text-muted">No news available.</p>
                )}
            </div>
            </main>
        </div>
        </div>
    );
};

export default Adnews;
