import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../App.css";

const Reg = () => {
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [altnumber, setAltnumber] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const [bloodgrp, setBloodgrp] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();

    async function regcode(e) {
        e.preventDefault();
        const patient = { name, email, number, password, age, gender, bloodgrp, address };

        try {
        const response = await axios.post("http://localhost:8000/api/patient", patient);
        if (response.data.msg === "Success") {
            window.alert("Registration Successful ✅");
            setName("");
            setEmail("");
            setNumber("");
            setAltnumber("");
            setAge("");
            setGender("");
            setBloodgrp("");
            setAddress("");
            setPassword("");
            navigate("/login");
        } else {
            window.alert("Something went wrong ❌");
            setPassword("");
        }
        } catch (err) {
        console.error(err);
        window.alert("Server error, please try again later!");
        }
    }

    return (
        <div
        className="d-flex flex-column min-vh-100"
        style={{
            background: "linear-gradient(180deg, #ffffffff, #d6e3f8ff)",
        }}
        >
        {/* Navbar */}
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
            <h4 className="fw-bold mb-0" style={{color:"#090808ff"}}>HEALTH NEXUS</h4>
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

        {/* Registration Form */}
        <div
            className="flex-grow-1 d-flex justify-content-center align-items-center px-3"
            style={{ marginTop: "20vh" }}
        >
            <div
            className="shadow-lg p-5 rounded-4 w-100"
            style={{
                background: "linear-gradient(180deg, #cbd4e8ff, #5a83caff)",
                maxWidth: "520px",
            }}
            >
            <div className="text-center mb-4">
                <img src={logo} alt="Logo" height="70" className="mb-3" />
                <h4 className="fw-bold text-primary">Welcome to HealthNexus</h4>
                <p className="text-muted mb-0">Patient Registration Form</p>
            </div>

            <form onSubmit={regcode}>
                <div className="mb-3">
                <label className="form-label fw-semibold">Name</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                </div>

                <div className="mb-3">
                <label className="form-label fw-semibold">Mobile Number</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Mobile Number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    required
                />
                </div>

                <div className="mb-3">
                <label className="form-label fw-semibold">Alternate Number</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Alternate Number"
                    value={altnumber}
                    onChange={(e) => setAltnumber(e.target.value)}
                />
                </div>

                <div className="mb-3">
                <label className="form-label fw-semibold">Email</label>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                </div>

                <div className="mb-3">
                <label className="form-label fw-semibold">Password</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                </div>

                <div className="mb-3">
                <label className="form-label fw-semibold">Age</label>
                <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                />
                </div>

                <div className="mb-3">
                <label className="form-label fw-semibold">Gender</label>
                <select
                    className="form-select"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                >
                    <option value="">--Select Gender--</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                </div>

                <div className="mb-3">
                <label className="form-label fw-semibold">Blood Group</label>
                <select
                    className="form-select"
                    value={bloodgrp}
                    onChange={(e) => setBloodgrp(e.target.value)}
                    required
                >
                    <option value="">--Select Blood Group--</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                </select>
                </div>

                <div className="mb-3">
                <label className="form-label fw-semibold">Address</label>
                <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Enter Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                ></textarea>
                </div>

                <button
                type="submit"
                className="btn btn-primary w-100 fw-semibold py-2 rounded-pill"
                style={{
                    background: "linear-gradient(90deg, #1b52c7ff, #4190f1ff)",
                    border: "none",
                }}
                >
                Register
                </button>

                <div className="text-center mt-4">
                <p className="small text-muted mb-1">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary fw-semibold">
                    Login here
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
};

export default Reg;
