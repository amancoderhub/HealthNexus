import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PatientLayout from "./PatientLayout";
import { createFeedback, deleteFeedback, getFeedbackForUser } from "../services/feedbackService";
import "../App.css";

function getStoredPatient() {
    try {
        return JSON.parse(localStorage.getItem("patient"));
    } catch {
        return null;
    }
}

function Pfeed() {
    const navigate = useNavigate();
    const [type, setType] = useState("");
    const [message, setMessage] = useState("");
    const [feedbackItems, setFeedbackItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [notice, setNotice] = useState("");
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

    async function handleSubmit(event) {
        event.preventDefault();
        const patient = getStoredPatient();
        if (!patient?._id) return;

        try {
            setIsSubmitting(true);
            setNotice("");
            setErrorMessage("");
            const response = await createFeedback({
                uid: patient._id,
                utype: "patient",
                type,
                msg: message.trim(),
                status: "u",
            });

            if (response.data.msg !== "Success") throw new Error("Feedback was not saved");

            setType("");
            setMessage("");
            setNotice("Thank you — your feedback has been added.");
            await loadFeedback();
        } catch (error) {
            console.error("Unable to add feedback:", error);
            setErrorMessage("Feedback could not be added. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    async function handleDelete(feedbackId) {
        if (!window.confirm("Delete this feedback? This action cannot be undone.")) return;

        try {
            setNotice("");
            const response = await deleteFeedback(feedbackId);
            if (response.data.msg !== "Success") throw new Error("Feedback was not deleted");

            setNotice("Feedback deleted.");
            await loadFeedback();
        } catch (error) {
            console.error("Unable to delete feedback:", error);
            setErrorMessage("Feedback could not be deleted. Please try again.");
        }
    }

    return (
        <PatientLayout>
            <section className="patient-page" aria-labelledby="feedback-heading">
                <div className="patient-page__heading">
                    <p className="patient-page__eyebrow">Your voice matters</p>
                    <h1 id="feedback-heading">Share feedback</h1>
                    <p>Tell us what worked well or where we can improve.</p>
                </div>

                <div className="patient-form-card">
                    <div className="patient-form-card__header">
                        <h2>Add feedback</h2>
                        <p>Your response helps us improve the experience.</p>
                    </div>

                    {notice && <div className="alert alert-success" role="status">{notice}</div>}
                    {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="feedback-type" className="form-label fw-semibold">Feedback type</label>
                            <select id="feedback-type" value={type} onChange={(event) => setType(event.target.value)} className="form-select" required>
                                <option value="">Select a type</option>
                                <option value="Feedback">Feedback</option>
                                <option value="Suggestion">Suggestion</option>
                                <option value="Complain">Complaint</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="feedback-message" className="form-label fw-semibold">Message</label>
                            <textarea id="feedback-message" value={message} onChange={(event) => setMessage(event.target.value)} className="form-control" rows="5" minLength="10" maxLength="1000" placeholder="Write your feedback here" required />
                            <div className="form-text text-end">{message.length}/1000</div>
                        </div>

                        <button type="submit" className="btn btn-premium w-100 py-2 fw-semibold" disabled={isSubmitting}>
                            {isSubmitting ? "Saving feedback…" : "Submit feedback"}
                        </button>
                    </form>
                </div>

                <section className="patient-feedback-list" aria-labelledby="recent-feedback-heading">
                    <div className="patient-feedback-list__heading">
                        <h2 id="recent-feedback-heading">Recent feedback</h2>
                        <span>{feedbackItems.length} total</span>
                    </div>

                    {isLoading ? (
                        <div className="patient-page__loading" role="status"><div className="spinner-border text-primary" aria-hidden="true" /><span>Loading feedback…</span></div>
                    ) : feedbackItems.length ? (
                        <div className="d-grid gap-3">
                            {feedbackItems.map((item) => (
                                <article className="patient-feedback-item" key={item._id}>
                                    <div>
                                        <span className="patient-feedback-item__type">{item.type}</span>
                                        <p>{item.msg}</p>
                                    </div>
                                    <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(item._id)}>Delete</button>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="patient-empty-state">
                            <h3>No feedback yet</h3>
                            <p>Your submitted feedback will appear here.</p>
                        </div>
                    )}
                </section>
            </section>
        </PatientLayout>
    );
}

export default Pfeed;
