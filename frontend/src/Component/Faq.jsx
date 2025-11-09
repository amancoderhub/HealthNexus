import { Container, Accordion, Row, Col, Image } from "react-bootstrap";
import faqimg from "../assets/faq.png"; 

export default function FAQ() {
    return (
        <section
        id="faq"
        className="py-5"
        style={{
            background: "linear-gradient(180deg, #ffffffff, #c7dafbff)",
        }}
        >
        <Container>
            <div className="text-center mb-5">
            <h2 className="fw-bold text-primary">Do You Have Questions?</h2>
            <p className="text-muted">
                We have answers — just read a few below! 👇
            </p>
            <Image
                src={faqimg}
                alt="FAQ Illustration"
                style={{
                height: "120px",
                objectFit: "contain",
                marginTop: "10px",
                }}
                fluid
            />
            </div>

            <Row className="mt-4">
            {/* Left Column */}
            <Col md={6} className="mb-4">
                <h5 className="fw-semibold text-dark mb-3">
                Q. General Questions FAQs
                </h5>
                <Accordion alwaysOpen>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                    How do I book an appointment?
                    </Accordion.Header>
                    <Accordion.Body>
                    You can easily book an appointment through our online portal
                    or by calling our hospital help desk.
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                    <Accordion.Header>
                    What are the visiting hours?
                    </Accordion.Header>
                    <Accordion.Body>
                    Visiting hours are from <b>9 AM to 7 PM</b> on all working
                    days.
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                    <Accordion.Header>
                    What about the Visitor’s Waiting Areas?
                    </Accordion.Header>
                    <Accordion.Body>
                    We have spacious, air-conditioned waiting areas with free
                    Wi-Fi for patient companions.
                    </Accordion.Body>
                </Accordion.Item>
                </Accordion>
            </Col>

            <Col md={6} className="mb-4">
                <h5 className="fw-semibold text-dark mb-3">
                Q. Billing & Insurance FAQs
                </h5>
                <Accordion alwaysOpen>
                <Accordion.Item eventKey="3">
                    <Accordion.Header>
                    Which insurance do you accept?
                    </Accordion.Header>
                    <Accordion.Body>
                    We accept New India, Bajaj, HDFC Health Insurance and most
                    others.
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="4">
                    <Accordion.Header>How can I pay my bill?</Accordion.Header>
                    <Accordion.Body>
                    Payments can be made via <b>UPI, card, cash</b>, or{" "}
                    <b>net banking</b>.
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="5">
                    <Accordion.Header>
                    Q. When will I get a receipt for my treatment?
                    </Accordion.Header>
                    <Accordion.Body>
                    A detailed invoice and receipt will be provided immediately
                    after payment or can be downloaded online.
                    </Accordion.Body>
                </Accordion.Item>
                </Accordion>
            </Col>
            </Row>
        </Container>
        </section>
    );
    }
