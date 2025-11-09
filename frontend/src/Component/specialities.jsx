import { Container, Row, Col } from "react-bootstrap";
import SpecImg from "../assets/specialities.png"; 
import { FaHeartbeat, FaBrain, FaBone, FaLungs, FaVial, FaUserMd, FaDna, FaProcedures } from "react-icons/fa";

export default function Specialities() {
    const specialities = [
        { name: "Cancer Care", icon: <FaVial className="text-primary me-2" /> },
        { name: "Heart & Vascular Institute", icon: <FaHeartbeat className="text-danger me-2" /> },
        { name: "Centre for Neurosciences", icon: <FaBrain className="text-primary me-2" /> },
        { name: "Centre for Bone & Joint Replacement", icon: <FaBone className="text-secondary me-2" /> },
        { name: "Centre for Chest & Respiratory Diseases", icon: <FaLungs className="text-info me-2" /> },
        { name: "Institute for Digestive & Liver Diseases", icon: <FaUserMd className="text-success me-2" /> },
        { name: "Centre for Renal Science & Kidney Transplant", icon: <FaProcedures className="text-warning me-2" /> },
        { name: "Centre for Genetic & Metabolic Disorders", icon: <FaDna className="text-purple me-2" /> }
    ];

    return (
        <section
        className="py-5"
        style={{
            background: "linear-gradient(180deg, #ecf3faff, #bcddf5ff)"
        }}
        >
        <Container>
            <h3 className="text-center mb-4 fw-bold text-dark">
            Specialities & Procedures
            </h3>
            <Row className="align-items-center">
            <Col md={6}>
                <h5 className="text-primary mb-3">Specialities</h5>
                <div className="d-flex flex-wrap">
                {specialities.map((sp, i) => (
                    <div
                    key={i}
                    className="d-flex align-items-center col-6 mb-3"
                    style={{
                        fontSize: "15px",
                        color: "#333",
                        transition: "0.3s",
                        cursor: "pointer"
                    }}
                    >
                    {sp.icon}
                    <span className="hover-blue">{sp.name}</span>
                    </div>
                ))}
                </div>

                <div className="mt-3">
                <a
                    href="#"
                    className="text-primary fw-semibold"
                    style={{ textDecoration: "none" }}
                >
                    View all &gt;
                </a>
                </div>
            </Col>

            <Col md={6} className="text-center mt-4 mt-md-0">
                <img
                src={SpecImg}
                alt="Specialities Illustration"
                className="img-fluid rounded-4 shadow-sm"
                style={{ maxHeight: "380px" }}
                />
            </Col>
            </Row>
        </Container>
        </section>
    );
}
