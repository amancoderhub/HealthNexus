import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, Button, NavDropdown, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"; 

export default function TopNavbar() {
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const role = localStorage.getItem("role");
        const admin = localStorage.getItem("admin");

        if (admin) setUserRole("admin");
        else if (role) setUserRole(role);
    }, []);

    const handleDashboardRedirect = () => {
        if (userRole === "admin") navigate("/admindash");
        else if (userRole === "doctor") navigate("/ddash");
        else if (userRole === "patient") navigate("/pdash");
    };

    return (
        <Navbar expand="lg" variant="dark" className="header-premium py-3 fixed-top">
            <Container>
                <Navbar.Brand as={Link} to="/" className="fw-bold d-flex align-items-center ">
                    <Image src={logo} alt="Health Nexus Logo" height="40" className="me-2" />
                    <span className="fs-4 text-white">Health<span >Nexus</span></span>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="ms-auto align-items-center gap-3">
                        <Nav.Link as={Link} to="/doctors" className="fw-bold">Find Doctors</Nav.Link>
                        <Nav.Link as={Link} to="/services" className="fw-bold">Services</Nav.Link>
                        <Nav.Link as={Link} to="/blogs" className="fw-semibold">Blogs</Nav.Link>

                        {userRole ? (
                            <Button onClick={handleDashboardRedirect} className="btn-premium rounded-pill px-4 fw-semibold shadow-sm">
                                My Dashboard
                            </Button>
                        ) : (
                            <>
                                <NavDropdown title="Login / Register" id="navbarScrollingDropdown" className="fw-bold">
                                    <NavDropdown.Item as={Link} to="/login" className="fw-semibold">Patient Login</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/login" className="fw-semibold">Doctor Login</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/reg" className="fw-semibold">Patient Register</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item as={Link} to="/admin" className="fw-semibold">Admin Login</NavDropdown.Item>
                                </NavDropdown>

                                <Button as={Link} to="/login" className="btn-premium rounded-pill px-4 fw-semibold shadow-sm">
                                    Book Appointment
                                </Button>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
