import { Navbar, Nav, Container, Button, NavDropdown, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; 

export default function TopNavbar() {
    return (
        <Navbar expand="lg" style={{background:"#79aaf0ff"}} className="shadow-sm py-3 fixed-top">
            <Container>
                <Navbar.Brand as={Link} to="/" className="fw-bold text-primary d-flex align-items-center ">
                    <Image src={logo} alt="Health Nexus Logo" height="40" className="me-2" />
                    <span className="fs-4 text-dark">Health<span >Nexus</span></span>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="ms-auto align-items-center gap-3">
                        <Nav.Link as={Link} to="/#doctors" className="fw-bold">Find Doctors</Nav.Link>
                        <Nav.Link as={Link} to="/#services" className="fw-bold"  >Services</Nav.Link>
                        <Nav.Link as={Link} to="/#blogs" className="fw-semibold" >Blogs</Nav.Link>

                        <NavDropdown title="Login / Register" id="navbarScrollingDropdown" className="fw-bold">
                            <NavDropdown.Item as={Link} to="/login" className="fw-semibold">Patient Login</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/login" className="fw-semibold">Doctor Login</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/reg" className="fw-semibold">Patient Register</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/admin" className="fw-semibold">Admin Login</NavDropdown.Item>
                        </NavDropdown>

                        <Button as={Link} to="/login"
                            variant="primary"
                            className="rounded-pill px-4 fw-semibold shadow-sm"
                            style={{
                                background: "linear-gradient(135deg, #007bff, #00b4d8)",
                                border: "none"
                            }}
                        >
                            Book Appointment
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
