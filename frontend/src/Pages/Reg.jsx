import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../App.css";
import httpClient from "../services/httpClient";

const initialForm = { name: "", number: "", altnumber: "", gender: "", age: "", bloodgrp: "", email: "", password: "", address: "" };

function Reg() {
    const navigate = useNavigate();
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [formError, setFormError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    function validateForm() {
        const nextErrors = {};
        const phonePattern = /^\d{10}$/;
        if (form.name.trim().length < 2) nextErrors.name = "Enter a name with at least 2 characters.";
        if (!phonePattern.test(form.number)) nextErrors.number = "Enter a valid 10-digit mobile number.";
        if (form.altnumber && !phonePattern.test(form.altnumber)) nextErrors.altnumber = "Enter a valid 10-digit alternate number.";
        if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = "Enter a valid email address.";
        if (form.password.length < 6) nextErrors.password = "Password must contain at least 6 characters.";
        if (!Number.isInteger(Number(form.age)) || Number(form.age) < 1 || Number(form.age) > 120) nextErrors.age = "Enter an age between 1 and 120.";
        if (!form.gender) nextErrors.gender = "Select a gender.";
        if (!form.bloodgrp) nextErrors.bloodgrp = "Select a blood group.";
        if (form.address.trim().length < 10) nextErrors.address = "Enter an address with at least 10 characters.";
        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    }

    function updateField(field, value) {
        setForm((current) => ({ ...current, [field]: value }));
        if (errors[field]) setErrors((current) => ({ ...current, [field]: "" }));
        if (formError) setFormError("");
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (!validateForm()) return;

        try {
            setIsSubmitting(true);
            setFormError("");
            const patient = { ...form, name: form.name.trim(), email: form.email.trim().toLowerCase(), address: form.address.trim() };
            const response = await httpClient.post("/patient", patient);
            if (response.data.msg !== "Success") throw new Error("Registration failed");
            setForm(initialForm);
            navigate("/login");
        } catch (error) {
            console.error("Registration failed:", error);
            setFormError("Registration could not be completed. Please check the details and try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="d-flex flex-column min-vh-100 bg-layout-premium">
            <header className="header-premium d-flex justify-content-between align-items-center px-4 shadow-sm" style={{ height: "9vh" }}><div className="d-flex align-items-center gap-3"><img src={logo} alt="HealthNexus" height="52" /><h4 className="fw-bold mb-0">HEALTH NEXUS</h4></div><Link to="/" className="btn btn-light btn-sm fw-semibold px-3">Home</Link></header>
            <main className="flex-grow-1 d-flex justify-content-center align-items-center px-3 pt-5 mt-5"><section className="shadow-lg glass-surface p-3 p-md-5 rounded-4 w-100 auth-form-card auth-form-card--wide" aria-labelledby="register-title"><div className="text-center mb-4"><img src={logo} alt="HealthNexus" height="70" className="mb-3" /><h1 id="register-title" className="h4 fw-bold text-primary">Create your patient account</h1><p className="text-muted mb-0">Complete the details below to register.</p></div>{formError && <div className="alert alert-danger" role="alert">{formError}</div>}<form noValidate onSubmit={handleSubmit}><div className="row"><FormField label="Full name" field="name" value={form.name} error={errors.name} onChange={updateField} /><FormField label="Mobile number" field="number" value={form.number} error={errors.number} onChange={updateField} inputMode="numeric" maxLength="10" /><FormField label="Alternate number (optional)" field="altnumber" value={form.altnumber} error={errors.altnumber} onChange={updateField} inputMode="numeric" maxLength="10" /><FormField label="Email" field="email" value={form.email} error={errors.email} onChange={updateField} type="email" /><FormField label="Password" field="password" value={form.password} error={errors.password} onChange={updateField} type="password" /><FormField label="Age" field="age" value={form.age} error={errors.age} onChange={updateField} type="number" min="1" max="120" /><SelectField label="Gender" field="gender" value={form.gender} error={errors.gender} onChange={updateField} options={["Male", "Female", "Other"]} /><SelectField label="Blood group" field="bloodgrp" value={form.bloodgrp} error={errors.bloodgrp} onChange={updateField} options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]} /></div><div className="mb-4"><label htmlFor="register-address" className="form-label fw-semibold">Address</label><textarea id="register-address" className={`form-control ${errors.address ? "is-invalid" : ""}`} rows="3" value={form.address} onChange={(event) => updateField("address", event.target.value)} aria-describedby="register-address-error" />{errors.address && <div id="register-address-error" className="invalid-feedback d-block">{errors.address}</div>}</div><button type="submit" className="btn btn-premium w-100 fw-semibold py-2 rounded-pill" disabled={isSubmitting}>{isSubmitting && <span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />}{isSubmitting ? "Creating account…" : "Register"}</button></form><div className="text-center mt-4"><p className="small text-muted mb-1">Already have an account? <Link to="/login" className="text-primary fw-semibold">Login here</Link></p><Link to="/" className="small text-secondary">Back to Home</Link></div></section></main>
        </div>
    );
}

function FormField({ label, field, value, error, onChange, type = "text", ...inputProps }) {
    const id = `register-${field}`;
    return <div className="col-md-6 mb-3"><label htmlFor={id} className="form-label fw-semibold">{label}</label><input id={id} type={type} className={`form-control ${error ? "is-invalid" : ""}`} value={value} onChange={(event) => onChange(field, event.target.value)} aria-describedby={`${id}-error`} {...inputProps} />{error && <div id={`${id}-error`} className="invalid-feedback d-block">{error}</div>}</div>;
}

function SelectField({ label, field, value, error, onChange, options }) {
    const id = `register-${field}`;
    return <div className="col-md-6 mb-3"><label htmlFor={id} className="form-label fw-semibold">{label}</label><select id={id} className={`form-select ${error ? "is-invalid" : ""}`} value={value} onChange={(event) => onChange(field, event.target.value)} aria-describedby={`${id}-error`}><option value="">Select {label.toLowerCase()}</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select>{error && <div id={`${id}-error`} className="invalid-feedback d-block">{error}</div>}</div>;
}

export default Reg;
