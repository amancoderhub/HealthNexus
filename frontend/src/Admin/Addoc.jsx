/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import axios from "axios";
import logo from "../assets/logo.png";
import "../App.css";

const Addoc = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [qua, setQua] = useState("");
    const [exp, setExp] = useState("");
    const [spe, setSpe] = useState("");
    const [address, setAddress] = useState("");

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

    async function docreg(e) {
        e.preventDefault();
        const doc = { name, email, number: mobile, password, gender, qua, exp, spe, address };
        const response = await axios.post("http://localhost:8000/api/doctor", doc);
        if (response.data.msg === "Success") {
        alert("✅ Doctor Added Successfully");
        setName("");
        setEmail("");
        setMobile("");
        setPassword("");
        setGender("");
        setQua("");
        setExp("");
        setSpe("");
        setAddress("");
        } else {
        alert("❌ Something went wrong");
        setPassword("");
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

    return (
        <div className="vh-100 d-flex flex-column" style={{ background: "#e8f0ff" }}>
        <header
            className="d-flex justify-content-between align-items-center px-4 shadow-sm"
            style={{
            height: "9vh",
            background: "linear-gradient(90deg, #245cd3ff, #4f9dfc)",
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

        <div className="d-flex flex-grow-1 position-relative" style={{ marginTop: "9vh", overflow: "hidden" }}>
            <aside
            className={`position-fixed h-100 shadow-lg sidebar ${sidebarOpen ? "open" : ""}`}
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
                        location.pathname === link.to ? "bg-primary text-white" : "bg-white text-dark"
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
            <h4 className="my-4 text-center fw-bold text-dark fs-1">ADD DOCTOR</h4>
            <div className="container d-flex justify-content-center align-items-center">
                <form
                onSubmit={docreg}
                className="shadow p-5 rounded-4"
                style={{
                    background: "#bcd3f6ff",
                    width: "100%",
                    maxWidth: "550px",
                }}
                >
                <img src={logo} alt="logo" height="50" className=" mb-4" />
                <h5 className="text-center fw-bold mb-4">Doctor Registration</h5>

                <label className="fw-semibold">Full Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Name"
                    className="form-control rounded-pill mb-3"
                    required
                />

                <label className="fw-semibold">Mobile</label>
                <input
                    type="number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="Enter Mobile Number"
                    className="form-control rounded-pill mb-3"
                    required
                />

                <label className="fw-semibold">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Email Id"
                    className="form-control rounded-pill mb-3"
                    required
                />

                <label className="fw-semibold">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    className="form-control rounded-pill mb-3"
                    required
                />

                <label className="fw-semibold">Gender</label>
                <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="form-control rounded-pill mb-3"
                    required
                >
                    <option value="">-- Select Gender --</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>

                <label className="fw-semibold">Qualification</label>
                <input
                    type="text"
                    value={qua}
                    onChange={(e) => setQua(e.target.value)}
                    placeholder="Qualification"
                    className="form-control rounded-pill mb-3"
                />

                <label className="fw-semibold">Experience</label>
                <input
                    type="text"
                    value={exp}
                    onChange={(e) => setExp(e.target.value)}
                    placeholder="Experience"
                    className="form-control rounded-pill mb-3"
                />

                <label className="fw-semibold">Speciality</label>
                <input
                    type="text"
                    value={spe}
                    onChange={(e) => setSpe(e.target.value)}
                    placeholder="Speciality"
                    className="form-control rounded-pill mb-3"
                />

                <label className="fw-semibold">Address</label>
                <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Address"
                    className="form-control rounded-3 mb-3"
                    rows={3}
                ></textarea>

                <div className="text-center mt-4">
                    <button
                    type="submit"
                    className="btn btn-primary rounded-pill px-4 fw-semibold"
                    >
                    Add Doctor
                    </button>
                </div>
                </form>
            </div>
            </main>
        </div>
        </div>
    );
};

export default Addoc;
