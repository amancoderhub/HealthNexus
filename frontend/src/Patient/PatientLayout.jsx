import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const patientLinks = [
    { to: "/pdash", label: "Dashboard" },
    { to: "/papp", label: "Appointments" },
    { to: "/preqapp", label: "Request appointment" },
    { to: "/pfeed", label: "Give feedback" },
    { to: "/pviewfeed", label: "My feedback" },
];

function PatientLayout({ children }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(() => window.innerWidth >= 992);

    useEffect(() => {
        const updateSidebarForScreenSize = () => setIsSidebarOpen(window.innerWidth >= 992);
        window.addEventListener("resize", updateSidebarForScreenSize);
        return () => window.removeEventListener("resize", updateSidebarForScreenSize);
    }, []);

    function closeSidebarOnMobile() {
        if (window.innerWidth < 992) setIsSidebarOpen(false);
    }

    function handleLogout() {
        localStorage.removeItem("patient");
        localStorage.removeItem("role");
        localStorage.removeItem("authToken");
        navigate("/login");
    }

    return (
        <div className="patient-layout">
            <header className="patient-layout__header">
                <div className="patient-layout__brand">
                    <button type="button" className="patient-layout__menu-button d-lg-none" aria-label="Open dashboard menu" onClick={() => setIsSidebarOpen(true)}>
                        <FaBars aria-hidden="true" />
                    </button>
                    <img src={logo} alt="HealthNexus" className="patient-layout__logo" />
                    <span className="patient-layout__title d-none d-md-inline">Patient dashboard</span>
                </div>
                <div className="patient-layout__actions">
                    <Link to="/" className="btn btn-light btn-sm fw-semibold px-3 d-none d-sm-inline-flex">Home</Link>
                    <button type="button" className="btn btn-danger btn-sm fw-semibold px-3" onClick={handleLogout}>Logout</button>
                </div>
            </header>

            <aside className={`patient-layout__sidebar ${isSidebarOpen ? "is-open" : ""}`} aria-label="Patient navigation">
                <div className="d-flex justify-content-end d-lg-none p-2">
                    <button type="button" className="btn btn-sm btn-outline-secondary rounded-circle" aria-label="Close dashboard menu" onClick={() => setIsSidebarOpen(false)}>
                        <FaTimes aria-hidden="true" />
                    </button>
                </div>
                <nav className="patient-layout__nav">
                    {patientLinks.map((link) => (
                        <Link key={link.to} to={link.to} className={`patient-layout__nav-link ${location.pathname === link.to ? "is-active" : ""}`} onClick={closeSidebarOnMobile}>
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </aside>

            <button type="button" className={`patient-layout__backdrop ${isSidebarOpen ? "is-visible" : ""}`} aria-label="Close dashboard menu" onClick={() => setIsSidebarOpen(false)} />
            <main className="patient-layout__content">{children}</main>
        </div>
    );
}

export default PatientLayout;
