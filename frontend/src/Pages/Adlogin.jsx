import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../App.css";
import httpClient from "../services/httpClient";

function Adlogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [formError, setFormError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("admin") && localStorage.getItem("authToken")) navigate("/admindash");
    }, [navigate]);

    function validateForm() {
        const nextErrors = {};
        if (!email.trim()) nextErrors.email = "Enter your email address.";
        else if (!/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = "Enter a valid email address.";
        if (!password) nextErrors.password = "Enter your password.";
        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (!validateForm()) return;

        try {
            setIsSubmitting(true);
            setFormError("");
            const response = await httpClient.post("/admin/log", { email: email.trim(), password });
            if (response.data.msg !== "Success") throw new Error("Invalid credentials");
            localStorage.setItem("authToken", response.data.token);
            localStorage.setItem("admin", response.data.user.email);
            navigate("/admindash");
        } catch (error) {
            console.error("Admin login failed:", error);
            setFormError(error.response?.status === 401 ? "Email or password is incorrect." : "Unable to log in right now. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="d-flex flex-column min-vh-100 bg-layout-premium">
            <header className="header-premium d-flex justify-content-between align-items-center px-4 shadow-sm" style={{ height: "9vh" }}><div className="d-flex align-items-center gap-3"><img src={logo} alt="HealthNexus" height="52" /><h4 className="fw-bold mb-0">HEALTH NEXUS</h4></div><Link to="/" className="btn btn-light btn-sm fw-semibold px-3">Home</Link></header>
            <main className="flex-grow-1 d-flex justify-content-center align-items-center px-3 pt-5 mt-5"><section className="shadow-lg glass-surface p-3 p-md-5 rounded-4 w-100 auth-form-card" aria-labelledby="admin-login-title"><div className="text-center mb-4"><img src={logo} alt="HealthNexus" height="70" className="mb-3" /><h1 id="admin-login-title" className="h4 fw-bold text-primary">Admin login</h1><p className="text-muted mb-0">Use your administrator account</p></div>{formError && <div className="alert alert-danger" role="alert">{formError}</div>}<form noValidate onSubmit={handleSubmit}><div className="mb-3"><label htmlFor="admin-email" className="form-label fw-semibold">Email</label><input id="admin-email" type="email" className={`form-control ${errors.email ? "is-invalid" : ""}`} value={email} onChange={(event) => { setEmail(event.target.value); setErrors((current) => ({ ...current, email: "" })); }} aria-describedby="admin-email-error" />{errors.email && <div id="admin-email-error" className="invalid-feedback d-block">{errors.email}</div>}</div><div className="mb-4"><label htmlFor="admin-password" className="form-label fw-semibold">Password</label><input id="admin-password" type="password" className={`form-control ${errors.password ? "is-invalid" : ""}`} value={password} onChange={(event) => { setPassword(event.target.value); setErrors((current) => ({ ...current, password: "" })); }} aria-describedby="admin-password-error" />{errors.password && <div id="admin-password-error" className="invalid-feedback d-block">{errors.password}</div>}</div><button type="submit" className="btn btn-premium w-100 fw-semibold py-2 rounded-pill" disabled={isSubmitting}>{isSubmitting && <span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />}{isSubmitting ? "Logging in…" : "Login"}</button></form><div className="text-center mt-4"><Link to="/" className="small text-secondary">Back to Home</Link></div></section></main>
        </div>
    );
}

export default Adlogin;
