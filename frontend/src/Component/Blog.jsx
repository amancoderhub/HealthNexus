import { Container, Row, Col, Card } from "react-bootstrap";
import blood from "../assets/bloodcacer.jpg"
import migrain from "../assets/migrain.jpg"
import corona from "../assets/corona.jpg"

export default function Blogs() {
    const blogs = [
        { title: "Understanding Blood Cancer", text: "Causes, symptoms & treatment explained.", img: blood },
        { title: "Migraine Symptoms", text: "Know the triggers & remedies for migraine.", img: migrain},
        { title: "Covid Care", text: "Everything you should know about Covid-19.", img: corona }
    ];

    return (
        <section className="py-5" style={{background:"#d3e3f3ff"}} id="blogs">
            <Container>
                <h2 className="text-center fw-bold mb-5 text-primary">Health Blogs 📰</h2>
                <Row className="g-4">
                    {blogs.map((b, i) => (
                        <Col md={4} key={i}>
                            <Card className="shadow-lg border-0 h-100 rounded-4 overflow-hidden">
                                <Card.Img src={b.img} alt={b.title} style={{ height: "200px", objectFit: "cover" }} />
                                <Card.Body>
                                    <Card.Title className="fw-semibold">{b.title}</Card.Title>
                                    <Card.Text className="text-muted">{b.text}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
}
