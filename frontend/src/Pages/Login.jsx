import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaUserMd, FaUser, FaLock } from "react-icons/fa";
import logo from "../assets/logo.png";
import "../App.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const navigate = useNavigate();

    async function adlog(e) {
        e.preventDefault();
        const user = { email, password, role };

        try {
        if (user.role === "Doctor") {
            const response = await axios.post("https://healthnexus-backend-53ei.onrender.com/api/doctor/log", user);
            if (response.data.msg === "Success") {
            localStorage.setItem("role", "doctor");
            localStorage.setItem("doctor", JSON.stringify({ _id: response.data.id }));
            navigate("/ddash");
            } else {
            window.alert("Invalid Doctor credentials ❌");
            }
        } else if (user.role === "Patient") {
            const response = await axios.post("https://healthnexus-backend-53ei.onrender.com/api/patient/log", user);
            if (response.data.msg === "Success") {
            localStorage.setItem("role", "patient");
            localStorage.setItem("patient", JSON.stringify({ _id: response.data.id }));
            navigate("/pdash");
            } else {
            window.alert("Invalid Patient credentials ");
            }
        } else {
            window.alert("Please select a valid role ⚠️");
        }
        } catch (err) {
        console.error(err);
        window.alert("Server error Try again later.");
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
            <h4 className="fw-bold mb-0 " style={{color:"#181313ff"}}>HEALTH NEXUS</h4>
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
            style={{ marginTop: "20vh"}}
        >
            <div
            className="shadow-lg p-5 rounded-4 w-100"
            style={{
                background: "linear-gradient(180deg, #cdd8e9ff, #6087d0ff)",
                maxWidth: "460px",
            }}
            >
            <div className="text-center mb-4">
                <img src={logo} alt="Logo" height="70" className="mb-3" />
                <h4 className="fw-bold text-primary">Welcome to HealthNexus</h4>
                <p className="text-muted mb-0">Doctor & Patient Login</p>
            </div>

            <form onSubmit={adlog}>
                <div className="mb-3 position-relative">
                <label className="form-label fw-semibold">Email</label>
                <div className="input-group">
                    <span className="input-group-text bg-light">
                    <FaUser />
                    </span>
                    <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                </div>
                </div>

                <div className="mb-3 position-relative">
                <label className="form-label fw-semibold">Password</label>
                <div className="input-group">
                    <span className="input-group-text bg-light">
                    <FaLock />
                    </span>
                    <input
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                </div>
                </div>

                <div className="mb-4 position-relative">
                <label className="form-label fw-semibold">Role</label>
                <div className="input-group">
                    <span className="input-group-text bg-light">
                    <FaUserMd />
                    </span>
                    <select
                    className="form-select"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                    >
                    <option value="">-- Select Role --</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Patient">Patient</option>
                    </select>
                </div>
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
                <p className="small text-muted mb-1">
                    Don’t have an account?{" "}
                    <Link to="/reg" className="text-primary fw-semibold">
                    Register here
                    </Link>
                </p>
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

export default Login;
