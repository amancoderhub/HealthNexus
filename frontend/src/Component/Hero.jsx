import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import Heroimg from "../assets/hero.png";
import DoctorImg from "../assets/finddoc.png";
import CheckupImg from "../assets/Healthcheck.png";
import MedicineImg from "../assets/medicine.png";

export default function Hero() {
    const features = [
        {
        title: "Find a Doctor",
        img: DoctorImg,
        bg: "linear-gradient(135deg, #e3f2fd, #bbdefb)", 
        },
        {
        title: "Health Check-up",
        img: CheckupImg,
        bg: "linear-gradient(135deg, #e8f5e9, #c8e6c9)", 
        },
        {
        title: "Order Medicine",
        img: MedicineImg,
        bg: "linear-gradient(135deg, #fff3e0, #ffe0b2)", 
        },
    ];

    return (
        <section
        className="hero-section py-5"
        style={{
            width: "100%",
            background: "linear-gradient(180deg, #e3f2fd, #ffffff)",
            overflow: "hidden",
            margin: 0,
            paddingTop: "80px",
        }}
        >
        <Container fluid="xxl" className="px-5 py-5">
            <Row className="align-items-center">
            <Col md={6}>
                <h1 className="fw-bold text-dark mb-3 ">
                Welcome On <span className="text-primary">HealthNexus</span>
                </h1>
                <h3 className="fw-semibold text-dark mb-4">
                Your Health, Our <span className="text-primary">Priority 💙</span>
                </h3>
                <p className="text-muted mb-4">
                Book appointments with trusted doctors and access personalized
                healthcare services effortlessly.
                </p>

                <Form className="d-flex justify-content-md-start justify-content-center">
                <Form.Control
                    type="text"
                    placeholder="Search Doctor or Specialty"
                    className="rounded-pill px-3 shadow-sm"
                    style={{ maxWidth: "300px" }}
                />
                <Button
                    variant="primary"
                    className="ms-2 rounded-pill px-4 fw-semibold shadow-sm"
                >
                    Search
                </Button>
                </Form>
            </Col>

            <Col md={6} className="mt-5 mt-md-0 text-center">
                <img
                src={Heroimg}
                alt="Healthcare Hero"
                className="img-fluid rounded-4 shadow-sm"
                style={{ maxHeight: "400px", userSelect: "none" }}
                />
            </Col>
            </Row>

            <Row className="mt-5 justify-content-center">
            {features.map((item, i) => (
                <Col md={4} sm={6} xs={12} key={i} className="mb-3">
                <div
                    className="feature-card text-center p-4 shadow-sm h-100 rounded-4"
                    style={{
                    background: item.bg,
                    border: "none",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow =
                        "0 10px 25px rgba(0,0,0,0.15)";
                    }}
                    onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                        "0 6px 15px rgba(0,0,0,0.1)";
                    }}
                >
                    <img
                    src={item.img}
                    alt={item.title}
                    style={{
                        height: "100px",
                        objectFit: "contain",
                        marginBottom: "10px",
                    }}
                    />
                    <h5 className="fw-semibold text-dark">{item.title}</h5>
                </div>
                </Col>
            ))}
            </Row>
        </Container>
        </section>
    );
}