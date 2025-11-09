import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/logo.png";
import "../App.css";

const Viewenquiry = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [openIndex, setOpenIndex] = useState(null);

    const validateAdmin = useCallback(() => {
        if (localStorage.getItem("admin") !== "admin@gmail.com") {
        navigate("/admin");
        }
    }, [navigate]);

    useEffect(() => {
        validateAdmin();
    }, [validateAdmin]);

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

    const handleLogout = () => {
        localStorage.removeItem("admin");
        navigate("/admin");
    };

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        {
        category: "Appointments",
        questions: [
            {
            q: "How do I schedule an appointment?",
            a: "Go to the 'Appointments' section and select your preferred doctor and time slot.",
            },
            {
            q: "What do I do if I can't find my doctor?",
            a: "Try searching by specialty or location. If still not found, contact support.",
            },
            {
            q: "How can I reschedule or cancel my appointment?",
            a: "You can modify or cancel appointments from your dashboard under 'My Appointments'.",
            },
        ],
        },
        {
        category: "Billing & Insurance",
        questions: [
            {
            q: "What payment methods are accepted?",
            a: "We accept credit/debit cards, UPI, and net banking.",
            },
            {
            q: "How do I update my insurance information?",
            a: "Go to your profile settings and edit your insurance details.",
            },
        ],
        },
        {
        category: "Technical Support",
        questions: [
            {
            q: "Why can't I log into my account?",
            a: "Ensure your email and password are correct or try resetting your password.",
            },
            {
            q: "How do I reset my password?",
            a: "Click ‘Forgot Password’ on the login page to reset it via email.",
            },
        ],
        },
    ];

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
            <img src={logo} alt="Logo" height="48" style={{ borderRadius: "6px" }} />
            <h4 className="fw-bold mb-0"> ADMIN DASHBOARD</h4>
            </div>

            <div className="d-flex align-items-center gap-3" style={{ zIndex: 3100 }}>
            <Link to="/" className="btn btn btn-primary btn-sm fw-semibold px-3">
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
                        border: "1px solid #8493c3ff",
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
            <h4 className="my-4 text-center fw-bold text-dark fs-1">VIEW ENQUIRY</h4>

            <div
                className="col-md-11 p-5 rounded shadow-lg mx-auto"
                style={{
                overflowY: "auto",
                background: "#aec6e2ff",
                }}
            >
                <h5 className="mb-3">Frequently Asked Questions (FAQs)</h5>
                <input
                type="text"
                className="form-control mb-4"
                placeholder="Search for a question..."
                />

                {faqs.map((section, i) => (
                <div key={i} className="mb-4">
                    <h6>{section.category}</h6>
                    <ul className="list-group">
                    {section.questions.map((item, j) => {
                        const index = `${i}-${j}`;
                        const isOpen = openIndex === index;
                        return (
                        <li
                            key={index}
                            className="list-group-item border-0 border-bottom py-2"
                            onClick={() => toggleAccordion(index)}
                            style={{
                            cursor: "pointer",
                            background: isOpen ? "#f8f9fa" : "transparent",
                            transition: "all 0.3s ease",
                            }}
                        >
                            <div className="d-flex justify-content-between align-items-center">
                            <span>{item.q}</span>
                            <span>{isOpen ? "▲" : "▼"}</span>
                            </div>
                            <div
                            style={{
                                maxHeight: isOpen ? "150px" : "0",
                                overflow: "hidden",
                                transition: "max-height 0.4s ease",
                            }}
                            >
                            <p className="mt-2 mb-0 text-muted small">{item.a}</p>
                            </div>
                        </li>
                        );
                    })}
                    </ul>
                </div>
                ))}

                <h5 className="mt-5 mb-3">Website Policy & Privacy</h5>
                <p>
                We prioritize patient privacy and data security. All personal and medical data is encrypted and securely
                stored in compliance with healthcare regulations.
                </p>
                <ul>
                <li>
                    <Link to="#">Privacy Policy</Link>
                </li>
                <li>
                    <Link to="#">Terms of Service</Link>
                </li>
                <li>All patient information is protected using advanced security measures.</li>
                </ul>

                <h5 className="mt-5 mb-3">Contact Information</h5>
                <ul>
                <li>
                    <strong>Phone:</strong> +91 98765 43210 (Mon–Fri, 9 AM – 6 PM)
                </li>
                <li>
                    <strong>Email:</strong> support@doctorportal.com
                </li>
                <li>
                    <strong>Address:</strong> 123 Health Street, Wellness City, India
                </li>
                </ul>

                <div className="rounded overflow-hidden mt-3" style={{ height: "230px" }}>
                <iframe
                    title="location-map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.472585012548!2d144.9574433153194!3d-37.81827197975166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d51b4f0b3b3%3A0x5045675218ce840!2sMelbourne%20VIC!5e0!3m2!1sen!2sin!4v1680884242765!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
                </div>
            </div>
            </main>
        </div>
        </div>
    );
};

export default Viewenquiry;
