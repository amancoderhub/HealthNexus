import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import axios from "axios";
import logo from "../assets/logo.png";
import "../App.css";

const Viewpat = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [patients, setPatients] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({});

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

    const validateAdmin = useCallback(() => {
        if (localStorage.getItem("admin") !== "admin@gmail.com") {
        navigate("/admin");
        }
    }, [navigate]);

    const fetchPatients = async () => {
        try {
        const res = await axios.get("http://localhost:8000/api/patient");
        if (res.data?.msg === "Success" && Array.isArray(res.data.value)) {
            setPatients(res.data.value);
        } else {
            setPatients([]);
        }
        } catch {
        setPatients([]);
        }
    };

    const deletePatient = async (id) => {
        try {
        await axios.delete(`http://localhost:8000/api/patient/${id}`);
        setPatients((prev) => prev.filter((pat) => pat._id !== id));
        } catch {
        alert("Failed to delete patient");
        }
    };

    const startEdit = (pat) => {
        setEditingId(pat._id);
        setFormData({ ...pat });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setFormData({});
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const saveEdit = async (id) => {
        try {
        await axios.put(`http://localhost:8000/api/patient/${id}`, formData);
        fetchPatients();
        setEditingId(null);
        setFormData({});
        } catch {
        alert("Failed to update patient");
        }
    };

    useEffect(() => {
        validateAdmin();
        fetchPatients();
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
                validateAdmin();
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
                        border: "1px solid #5a6aa5ff",
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
            <h4 className="my-4 text-center fw-bold text-dark fs-1">VIEW PATIENT</h4>

            <div
                className="col-md-11 p-5 rounded shadow-lg mx-auto table-responsive"
                style={{ background: "#a2bcddff" }}
            >
                <table className="table table-light table-hover text-center align-middle">
                <thead className="table-dark text-center">
                    <tr>
                    <th>S.No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Blood Group</th>
                    <th colSpan={2}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.length > 0 ? (
                    patients.map((pat, i) => (
                        <tr key={pat._id}>
                        <td>{i + 1}</td>
                        <td>
                            {editingId === pat._id ? (
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="form-control form-control-sm"
                            />
                            ) : (
                            pat.name
                            )}
                        </td>
                        <td>
                            {editingId === pat._id ? (
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="form-control form-control-sm"
                            />
                            ) : (
                            pat.email
                            )}
                        </td>
                        <td>
                            {editingId === pat._id ? (
                            <input
                                type="text"
                                name="number"
                                value={formData.number}
                                onChange={handleChange}
                                className="form-control form-control-sm"
                            />
                            ) : (
                            pat.number
                            )}
                        </td>
                        <td>
                            {editingId === pat._id ? (
                            <input
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                className="form-control form-control-sm"
                            />
                            ) : (
                            pat.age
                            )}
                        </td>
                        <td>
                            {editingId === pat._id ? (
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="form-control form-control-sm"
                            >
                                <option value="">--Select--</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            ) : (
                            pat.gender
                            )}
                        </td>
                        <td>
                            {editingId === pat._id ? (
                            <input
                                type="text"
                                name="bloodgrp"
                                value={formData.bloodgrp}
                                onChange={handleChange}
                                className="form-control form-control-sm"
                            />
                            ) : (
                            pat.bloodgrp
                            )}
                        </td>
                        <td>
                            {editingId === pat._id ? (
                            <>
                                <button
                                type="button"
                                className="btn btn-sm btn-success me-2"
                                onClick={() => saveEdit(pat._id)}
                                >
                                Save
                                </button>
                                <button
                                type="button"
                                className="btn btn-sm btn-secondary"
                                onClick={cancelEdit}
                                >
                                Cancel
                                </button>
                            </>
                            ) : (
                            <button
                                type="button"
                                className="btn btn-sm btn-warning"
                                onClick={() => startEdit(pat)}
                            >
                                Edit
                            </button>
                            )}
                        </td>
                        <td>
                            <button
                            type="button"
                            className="btn btn-sm btn-danger"
                            onClick={() => deletePatient(pat._id)}
                            >
                            Delete
                            </button>
                        </td>
                        </tr>
                    ))
                    ) : (
                    <tr>
                        <td colSpan="9" className="text-center">
                        No patients found
                        </td>
                    </tr>
                    )}
                </tbody>
                </table>
            </div>
            </main>
        </div>
        </div>
    );
};

export default Viewpat;
