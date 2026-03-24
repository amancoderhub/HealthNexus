import React, { useEffect } from "react";
import TopNavbar from "../Component/TopNavbar";
import Footer from "../Component/Footer";
import Specialities from "../Component/specialities";
import Facilities from "../Component/Facilities";

export default function ServicesPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-layout-premium min-vh-100 d-flex flex-column">
            <TopNavbar />
            <div className="flex-grow-1" style={{ paddingTop: "90px" }}>
                <div className="container py-5 text-center">
                    <h1 className="fw-bold text-primary mb-3">World-Class Healthcare Services</h1>
                    <p className="text-muted lead mx-auto" style={{ maxWidth: "800px" }}>
                        Experience a premium tier of personalized care. Our state-of-the-art facilities and dedicated specialists are equipped to handle all your health needs with precision and compassion.
                    </p>
                </div>
                <Specialities />
                <Facilities />
            </div>
            <Footer />
        </div>
    );
}
