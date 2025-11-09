import { Container, Row, Col, Card, Button } from "react-bootstrap";
import p1 from "../assets/patient1.jpg";
import p2 from "../assets/patient2.png";
import p3 from "../assets/patient3.png";
import p4 from "../assets/patient4.png";

export default function Testimonials() {
    const reviews = [
        {
        name: "Divyanshu",
        text:
            "I, Prabhakar Singh, 24, was diagnosed with a stage-1 GI infection. Dr. Sunil Kumar Chawla handled my case with great care and professionalism.",
        date: "17/10/2025",
        img: p1,
        },
        {
        name: "Arif Singh Chopra",
        text:
            "I had a consultation regarding my health. I'm always ready to service professional health consulting at an affordable price.",
        date: "27/10/2025",
        img: p2,
        },
        {
        name: "Rishabh Pant",
        text:
            "Needed a consultation regarding healthcare or diagnostic? I'm always ready to provide you with professional healthcare consulting at an affordable price.",
        date: "27/09/2025",
        img: p3,
        },
        {
        name: "Abhishek",
        text:
            "My experience under the care of Dr. Sunil Sharma has been amazing! He’s empathetic, professional, and thorough in his evaluations.",
        date: "31/03/2025",
        img: p4,
        },
    ];

    return (
        <section
        id="testimonials"
        style={{
            background: "linear-gradient(180deg, #eaf5ff, #ffffff)",
            padding: "80px 0",
        }}
        >
        <Container>
            <h2 className="text-center fw-bold mb-5 text-primary">
            What Our Patients Say 💬
            </h2>

            <div
            className="rounded-4 p-5 shadow-sm"
            style={{
                background: "#f4faff",
                boxShadow: "0 5px 25px rgba(0,0,0,0.05)",
            }}
            >
            <Row className="g-4">
                {reviews.map((r, i) => (
                <Col md={6} key={i}>
                    <Card
                    className="border-0 shadow-sm p-4 h-100 rounded-4"
                    style={{
                        background: "#ffffff",
                        transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-6px)";
                        e.currentTarget.style.boxShadow =
                        "0 10px 25px rgba(0,0,0,0.1)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow =
                        "0 5px 15px rgba(0,0,0,0.05)";
                    }}
                    >
                    <div className="d-flex align-items-center mb-3">
                        <img
                        src={r.img}
                        alt={r.name}
                        style={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            marginRight: "15px",
                        }}
                        />
                        <div>
                        <h6 className="mb-0 fw-semibold text-dark">{r.name}</h6>
                        <small className="text-muted">Posted on: {r.date}</small>
                        </div>
                    </div>
                    <Card.Text className="text-muted fs-6">{r.text}</Card.Text>
                    <div className="text-warning mt-3">⭐⭐⭐⭐⭐</div>
                    </Card>
                </Col>
                ))}
            </Row>

            <div className="text-center mt-5">
                <Button
                variant="primary"
                className="rounded-pill px-4 py-2 fw-semibold shadow-sm"
                >
                Get Consultation
                </Button>
            </div>
            </div>
        </Container>
        </section>
    );
}
