import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PatientLayout from "./PatientLayout";
import { deleteFeedback, getFeedbackForUser } from "../services/feedbackService";
import "../App.css";

function getStoredPatient() {
    try {
        return JSON.parse(localStorage.getItem("patient"));
    } catch {
        return null;
    }
}

function Pviewfeed() {
    const navigate = useNavigate();
    const [feedbackItems, setFeedbackItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const loadFeedback = useCallback(async () => {
        const patient = getStoredPatient();
        if (!patient?._id) return;

        try {
            setErrorMessage("");
            const response = await getFeedbackForUser(patient._id);
            if (response.data.msg === "Success") setFeedbackItems(response.data.value);
        } catch (error) {
            console.error("Unable to load patient feedback:", error);
            setErrorMessage("Your feedback could not be loaded. Please refresh and try again.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (localStorage.getItem("role") !== "patient" || !getStoredPatient()?._id) {
            navigate("/login");
            return;
        }

        loadFeedback();
    }, [loadFeedback, navigate]);

    async function handleDelete(feedbackId) {
        if (!window.confirm("Delete this feedback? This action cannot be undone.")) return;

        try {
            const response = await deleteFeedback(feedbackId);
            if (response.data.msg !== "Success") throw new Error("Feedback was not deleted");
            await loadFeedback();
        } catch (error) {
            console.error("Unable to delete feedback:", error);
            setErrorMessage("Feedback could not be deleted. Please try again.");
        }
    }

    return (
        <PatientLayout>
            <section className="patient-page" aria-labelledby="my-feedback-heading">
                <div className="patient-page__heading">
                    <p className="patient-page__eyebrow">History</p>
                    <h1 id="my-feedback-heading">My feedback</h1>
                    <p>Review or remove feedback you have submitted.</p>
                </div>

                {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}

                {isLoading ? (
                    <div className="patient-page__loading" role="status"><div className="spinner-border text-primary" aria-hidden="true" /><span>Loading feedback…</span></div>
                ) : feedbackItems.length ? (
                    <div className="patient-table-card table-responsive">
                        <table className="table align-middle mb-0">
                            <thead>
                                <tr><th scope="col">#</th><th scope="col">Type</th><th scope="col">Message</th><th scope="col"><span className="visually-hidden">Actions</span></th></tr>
                            </thead>
                            <tbody>
                                {feedbackItems.map((item, index) => (
                                    <tr key={item._id}>
                                        <td>{index + 1}</td>
                                        <td><span className="patient-feedback-item__type">{item.type}</span></td>
                                        <td>{item.msg}</td>
                                        <td className="text-end"><button type="button" className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(item._id)}>Delete</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="patient-empty-state">
                        <h2>No feedback to show</h2>
                        <p>Once you submit feedback, it will be shown here.</p>
                    </div>
                )}
            </section>
        </PatientLayout>
    );
}

export default Pviewfeed;
