import { Container, Row, Col } from "react-bootstrap";
import logo from "../assets/logo.png";
import { FaGlobe, FaLinkedin, FaCamera, FaBriefcase } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="footer-section">
        <div className="footer-inner">
            <Row className="gy-4 gx-md-5 mx-0 justify-content-between align-items-start">
            <Col md={4} sm={12}>
                <div className="d-flex align-items-center footer-brand mb-3">
                <img src={logo} alt="Health Nexus" style={{height:"42px"}} />
                <h4 className="ms-4 mb-0">
                    Health<span style={{ color: "#00b4d8" }}>Nexus</span>
                </h4>
                </div>
                <p className="footer-text pe-md-5">
                Your trusted healthcare companion — connecting you with expert doctors,
                hospitals, and top-class medical services anytime, anywhere.
                </p>
            </Col>
            <Col md={2} sm={6}>
                <h6 className="footer-heading">Specialities</h6>
                <ul className="footer-list">
                <li>Cardiology</li>
                <li>Neurology</li>
                <li>Oncology</li>
                <li>Pediatrics</li>
                <li>Orthopedics</li>
                </ul>
            </Col>
            <Col md={2} sm={6}>
                <h6 className="footer-heading">Quick Links</h6>
                <ul className="footer-list">
                <li>Privacy Policy</li>
                <li>Terms & Conditions</li>
                <li>FAQs</li>
                <li>Contact Us</li>
                </ul>
            </Col>
            <Col md={3} sm={12}>
                <h6 className="footer-heading">Follow Us</h6>
                <div className="footer-socials d-flex gap-3 fs-4">
                <FaGlobe className="social-icon" />
                <FaLinkedin className="social-icon" />
                <FaCamera className="social-icon" />
                <FaBriefcase className="social-icon" />
                </div>
            </Col>
            </Row>
            <hr className="footer-divider" />
            <p className="footer-bottom-text mb-0">
            © 2025 <span style={{ color: "#00b4d8" }}>Health Nexus</span>. All Rights Reserved.
            </p>
        </div>
        </footer>
    );
}
