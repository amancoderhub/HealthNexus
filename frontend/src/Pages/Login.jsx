import { useEffect, useState } from "react";
import { FaLock, FaUser, FaUserMd } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../App.css";
import httpClient from "../services/httpClient";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [errors, setErrors] = useState({});
    const [formError, setFormError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const savedRole = localStorage.getItem("role");
        if (savedRole === "patient") navigate("/pdash");
        if (savedRole === "doctor") navigate("/ddash");
    }, [navigate]);

    function validateForm() {
        const nextErrors = {};
        if (!email.trim()) nextErrors.email = "Enter your email address.";
        else if (!/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = "Enter a valid email address.";
        if (!password) nextErrors.password = "Enter your password.";
        if (!role) nextErrors.role = "Select whether you are a doctor or patient.";
        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    }

    function updateField(field, value) {
        if (errors[field]) setErrors((current) => ({ ...current, [field]: "" }));
        if (formError) setFormError("");
        if (field === "email") setEmail(value);
        if (field === "password") setPassword(value);
        if (field === "role") setRole(value);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (!validateForm()) return;

        try {
            setIsSubmitting(true);
            setFormError("");
            const endpoint = role === "Doctor" ? "/doctor/log" : "/patient/log";
            const response = await httpClient.post(endpoint, { email: email.trim(), password, role });

            if (response.data.msg !== "Success") throw new Error("Invalid credentials");

            localStorage.setItem("authToken", response.data.token);
            localStorage.setItem("role", role.toLowerCase());
            localStorage.setItem(role.toLowerCase(), JSON.stringify({ _id: response.data.id }));
            navigate(role === "Doctor" ? "/ddash" : "/pdash");
        } catch (error) {
            console.error("Login failed:", error);
            const message = error.response?.status === 401
                ? "Email or password is incorrect."
                : "Unable to log in right now. Please try again.";
            setFormError(message);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="d-flex flex-column min-vh-100 bg-layout-premium">
            <header className="header-premium d-flex justify-content-between align-items-center px-4 shadow-sm" style={{ height: "9vh" }}>
                <div className="d-flex align-items-center gap-3"><img src={logo} alt="HealthNexus" height="52" /><h4 className="fw-bold mb-0">HEALTH NEXUS</h4></div>
                <Link to="/" className="btn btn-light btn-sm fw-semibold px-3">Home</Link>
            </header>

            <main className="flex-grow-1 d-flex justify-content-center align-items-center px-3 pt-5 mt-5">
                <section className="shadow-lg glass-surface p-3 p-md-5 rounded-4 w-100 auth-form-card" aria-labelledby="login-title">
                    <div className="text-center mb-4"><img src={logo} alt="HealthNexus" height="70" className="mb-3" /><h1 id="login-title" className="h4 fw-bold text-primary">Welcome to HealthNexus</h1><p className="text-muted mb-0">Doctor and patient login</p></div>
                    {formError && <div className="alert alert-danger" role="alert">{formError}</div>}

                    <form noValidate onSubmit={handleSubmit}>
                        <div className="mb-3"><label htmlFor="login-email" className="form-label fw-semibold">Email</label><div className="input-group"><span className="input-group-text bg-light"><FaUser aria-hidden="true" /></span><input id="login-email" type="email" className={`form-control ${errors.email ? "is-invalid" : ""}`} value={email} onChange={(event) => updateField("email", event.target.value)} aria-describedby="login-email-error" /></div>{errors.email && <div id="login-email-error" className="invalid-feedback d-block">{errors.email}</div>}</div>
                        <div className="mb-3"><label htmlFor="login-password" className="form-label fw-semibold">Password</label><div className="input-group"><span className="input-group-text bg-light"><FaLock aria-hidden="true" /></span><input id="login-password" type="password" className={`form-control ${errors.password ? "is-invalid" : ""}`} value={password} onChange={(event) => updateField("password", event.target.value)} aria-describedby="login-password-error" /></div>{errors.password && <div id="login-password-error" className="invalid-feedback d-block">{errors.password}</div>}</div>
                        <div className="mb-4"><label htmlFor="login-role" className="form-label fw-semibold">Role</label><div className="input-group"><span className="input-group-text bg-light"><FaUserMd aria-hidden="true" /></span><select id="login-role" className={`form-select ${errors.role ? "is-invalid" : ""}`} value={role} onChange={(event) => updateField("role", event.target.value)} aria-describedby="login-role-error"><option value="">Select your role</option><option value="Doctor">Doctor</option><option value="Patient">Patient</option></select></div>{errors.role && <div id="login-role-error" className="invalid-feedback d-block">{errors.role}</div>}</div>
                        <button type="submit" className="btn btn-premium w-100 fw-semibold py-2 rounded-pill" disabled={isSubmitting}>{isSubmitting && <span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />} {isSubmitting ? "Logging in…" : "Login"}</button>
                    </form>
                    <div className="text-center mt-4"><p className="small text-muted mb-1">Don&apos;t have an account? <Link to="/reg" className="text-primary fw-semibold">Register here</Link></p><Link to="/" className="small text-secondary">Back to Home</Link></div>
                </section>
            </main>
        </div>
    );
}

export default Login;
