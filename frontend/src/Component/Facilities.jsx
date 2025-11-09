import { Container, Row, Col, Card } from "react-bootstrap";
import emergency from "../assets/emergency.png";
import pediatric from "../assets/facility-pediatric.png";
import gynecology from "../assets/facility-gynecology.png";
import cardiology from "../assets/facility-cardiology.png";
import neurology from "../assets/facility-neurology.png";
import psychiatry from "../assets/facility-psychiatry.png";
import oncology from "../assets/facility-oncology.png";
import urology from "../assets/facility-urology.png";

export default function Facilities() {
    const facilities = [
        { name: "Emergency Department", img: emergency, bg: "linear-gradient(135deg, #e3f2fd, #bbdefb)" },
        { name: "Pediatric Department", img: pediatric, bg: "linear-gradient(135deg, #fce4ec, #f8bbd0)" },
        { name: "Gynecology Department", img: gynecology, bg: "linear-gradient(135deg, #f3e5f5, #e1bee7)" },
        { name: "Cardiology Department", img: cardiology, bg: "linear-gradient(135deg, #e8f5e9, #c8e6c9)" },
        { name: "Neurology Department", img: neurology, bg: "linear-gradient(135deg, #fff3e0, #ffe0b2)" },
        { name: "Psychiatry Department", img: psychiatry, bg: "linear-gradient(135deg, #ede7f6, #d1c4e9)" },
        { name: "Oncology Department", img: oncology, bg: "linear-gradient(135deg, #fbe9e7, #ffccbc)" },
        { name: "Urology Department", img: urology, bg: "linear-gradient(135deg, #e0f7fa, #b2ebf2)" },
    ];

    return (
        <section
        className="py-5"
        id="facilities"
        style={{
            background: "linear-gradient(180deg, #f9fbfd, #e3f2fd)",
            overflow: "hidden",
        }}
        >
        <Container>
            <h2 className="text-center fw-bold mb-5 text-primary">Our Facilities 🏥</h2>
            <Row className="g-4">
            {facilities.map((f, i) => (
                <Col md={3} sm={6} xs={12} key={i}>
                <Card
                    className="text-center border-0 shadow-sm h-100 p-4 rounded-4"
                    style={{
                    background: f.bg,
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
                    <div className="d-flex justify-content-center">
                    <Card.Img
                        src={f.img}
                        alt={f.name}
                        style={{
                        height: "90px",
                        width: "90px",
                        objectFit: "contain",
                        marginBottom: "15px",
                        }}
                    />
                    </div>
                    <Card.Body>
                    <Card.Title className="fw-semibold fs-6 text-dark">
                        {f.name}
                    </Card.Title>
                    </Card.Body>
                </Card>
                </Col>
            ))}
            </Row>
        </Container>
        </section>
    );
    }