import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Adlogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function adlog(e) {
        e.preventDefault();
        const admin = { email, password };

        try {
        const response = await axios.post("https://healthnexus-backend-53ei.onrender.com/api/admin/log", admin);
        if (response.data.msg === "Success") {
            localStorage.setItem("admin", "admin@gmail.com");
            setEmail("");
            setPassword("");
            navigate("/admindash");
        } else {
            window.alert("Invalid credentials ❌");
            setPassword("");
        }
        } catch (error) {
        console.error(error);
        window.alert("Server error ❌ Try again later.");
        }
    }

    return (
        <div
        className="d-flex flex-column min-vh-100"
        style={{
            background: "linear-gradient(180deg, #ffffffff, #d6e3f8ff)",
        }}
        >
        <header
            className="d-flex justify-content-between align-items-center px-4 shadow-sm"
            style={{
            height: "9vh",
            background: "linear-gradient(90deg, #71a1eaff, #71a9eeff)",
            color: "#f9f3f3ff",
            width: "100%",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 1000,
            }}
        >
            <div className="d-flex align-items-center gap-3">
            <img src={logo} alt="Logo" height="52" style={{ borderRadius: "6px" }} />
            <h4 className="fw-bold mb-0">HEALTH NEXUS</h4>
            </div>

            <div className="d-flex align-items-center gap-3">
            <Link
                to="/"
                className="btn btn btn-primary btn-sm fw-semibold px-3"
                style={{
                borderRadius: "50px",
                transition: "0.3s",
                }}
            >
                Home
            </Link>
            </div>
        </header>

        <div
            className="flex-grow-1 d-flex justify-content-center align-items-center px-3"
            style={{ marginTop: "20vh" }}
        >
            <div
            className="shadow-lg p-5 rounded-4 w-100"
            style={{
                background: "linear-gradient(180deg, #ced8e8ff, #4d77c0ff)",
                maxWidth: "460px",
            }}
            >
            <div className="text-center mb-4">
                <img src={logo} alt="Logo" height="70" className="mb-3" />
                <h4 className="fw-bold text-primary">Welcome to HealthNexus</h4>
                <p className="text-muted mb-0">Admin Login</p>
            </div>

            <form onSubmit={adlog}>
                <div className="mb-3">
                <label className="form-label fw-semibold">Email</label>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                </div>

                <div className="mb-4">
                <label className="form-label fw-semibold">Password</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                </div>

                <button
                type="submit"
                className="btn btn-primary w-100 fw-semibold py-2 rounded-pill"
                style={{
                    background: "linear-gradient(90deg, #1b52c7ff, #4190f1ff)",
                    border: "none",
                }}
                >
                Login
                </button>

                <div className="text-center mt-4">
                <Link to="/" className="small text-secondary">
                    Back to Home
                </Link>
                </div>
            </form>
            </div>
        </div>
        </div>
    );
}

export default Adlogin;
