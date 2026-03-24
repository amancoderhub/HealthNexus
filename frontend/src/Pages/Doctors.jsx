import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import TopNavbar from "../Component/TopNavbar";
import Footer from "../Component/Footer";

export default function DoctorsPage() {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        
        const fetchDoctorsData = async () => {
            try {
                let res = await axios.get("https://healthnexus-backend-53ei.onrender.com/api/doctor");
                if (res.data?.msg === "Success" && Array.isArray(res.data.value)) {
                    setDoctors(res.data.value);
                }
            } catch (err) {
                console.warn("Live API timeout or error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctorsData();
    }, []);

    return (
        <div className="bg-layout-premium min-vh-100 d-flex flex-column">
            <TopNavbar />
            <div className="flex-grow-1" style={{ paddingTop: "100px" }}>
                <Container className="py-5">
                    <div className="text-center mb-5">
                        <h1 className="fw-bold text-primary">Meet Our Specialists</h1>
                        <p className="text-muted lead mx-auto" style={{ maxWidth: "700px" }}>
                            Discover our top-rated medical professionals. Find the right doctor according to your needs and book an appointment instantly.
                        </p>
                    </div>

                    <Row className="g-4">
                        {loading ? (
                            <Col xs={12}>
                                <div className="text-center p-5 glass-surface rounded-4">
                                    <div className="spinner-border text-primary mb-3" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    <h4 className="text-muted">Fetching live medical roster...</h4>
                                    <p className="text-muted small">Waking up remote backend. May take up to 45 seconds.</p>
                                </div>
                            </Col>
                        ) : doctors.length > 0 ? (
                            doctors.map(doc => (
                                <Col md={6} lg={4} key={doc._id}>
                                    <Card className="glass-surface h-100 border-0 rounded-4 overflow-hidden">
                                        <Card.Body className="p-4 text-center">
                                            <div 
                                                className="rounded-circle bg-primary-gradient text-white d-flex align-items-center justify-content-center mx-auto mb-3 shadow-sm"
                                                style={{ width: "80px", height: "80px", fontSize: "2rem", fontWeight: "bold" }}
                                            >
                                                {doc.name.charAt(0).toUpperCase()}
                                            </div>
                                            <Card.Title className="fw-bold text-dark fs-4 mb-2">{doc.name}</Card.Title>
                                            <Card.Subtitle className="text-primary mb-3 fw-semibold">{doc.spe || "General Physician"}</Card.Subtitle>
                                            <hr className="text-muted" />
                                            <div className="text-muted mb-3 small d-flex flex-column gap-2 text-start">
                                                <div><strong>Qualification:</strong> {doc.qua || "M.B.B.S, MD"}</div>
                                                <div><strong>Experience:</strong> {doc.exp || "10+ Years"}</div>
                                                <div className="text-truncate"><strong>Location:</strong> {doc.address || "HealthNexus Hospital"}</div>
                                            </div>
                                            <Link to="/login" className="btn btn-premium w-100 rounded-pill fw-semibold py-2 mt-3">
                                                Book Appointment
                                            </Link>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <Col xs={12}>
                                <div className="text-center p-5 glass-surface rounded-4">
                                    <h4 className="text-muted">No specialists found aligned with immediate registration blocks.</h4>
                                </div>
                            </Col>
                        )}
                    </Row>
                </Container>
            </div>
            <Footer />
        </div>
    );
}
