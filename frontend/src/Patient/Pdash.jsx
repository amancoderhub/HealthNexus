import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PatientLayout from "./PatientLayout";
import { getPatientStats } from "../services/patientService";
import "../App.css";

const dashboardCards = [
    { key: "a", label: "Total appointments", tone: "primary" },
    { key: "pena", label: "Pending appointments", tone: "warning" },
    { key: "cona", label: "Confirmed appointments", tone: "success" },
    { key: "cana", label: "Cancelled appointments", tone: "danger" },
    { key: "coma", label: "Completed appointments", tone: "complete" },
    { key: "f", label: "Feedback", tone: "info" },
    { key: "s", label: "Suggestions", tone: "purple" },
    { key: "c", label: "Complaints", tone: "danger" },
];

function Pdash() {
    const navigate = useNavigate();
    const [stats, setStats] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const patient = localStorage.getItem("patient");
        const role = localStorage.getItem("role");

        if (!patient || role !== "patient") {
            navigate("/login");
            return;
        }

        let patientId;
        try {
            patientId = JSON.parse(patient)._id;
        } catch {
            navigate("/login");
            return;
        }

        async function loadStats() {
            try {
                const response = await getPatientStats(patientId);
                if (response.data.msg === "Success") setStats(response.data.value);
            } catch (error) {
                console.error("Unable to load patient dashboard statistics:", error);
                setErrorMessage("Your dashboard data could not be loaded. Please refresh and try again.");
            } finally {
                setIsLoading(false);
            }
        }

        loadStats();
    }, [navigate]);

    return (
        <PatientLayout>
            <section className="patient-page" aria-labelledby="dashboard-heading">
                <div className="patient-page__heading">
                    <p className="patient-page__eyebrow">Overview</p>
                    <h1 id="dashboard-heading">Your dashboard</h1>
                    <p>Keep track of appointments and feedback in one place.</p>
                </div>

                {isLoading ? (
                    <div className="patient-page__loading" role="status">
                        <div className="spinner-border text-primary" aria-hidden="true" />
                        <span>Loading dashboard data…</span>
                    </div>
                ) : errorMessage ? (
                    <div className="alert alert-warning" role="alert">{errorMessage}</div>
                ) : (
                    <div className="patient-stats-grid">
                        {dashboardCards.map((card) => (
                            <article key={card.key} className={`patient-stat-card patient-stat-card--${card.tone}`}>
                                <span className="patient-stat-card__value">{stats[card.key] ?? 0}</span>
                                <span className="patient-stat-card__label">{card.label}</span>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </PatientLayout>
    );
}

export default Pdash;
