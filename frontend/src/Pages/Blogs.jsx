import React, { useEffect } from "react";
import TopNavbar from "../Component/TopNavbar";
import Footer from "../Component/Footer";
import Blog from "../Component/Blog";

export default function BlogsPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-layout-premium min-vh-100 d-flex flex-column">
            <TopNavbar />
            <div className="flex-grow-1" style={{ paddingTop: "90px" }}>
                <div className="container py-5 text-center">
                    <h1 className="fw-bold text-primary mb-3">Our Health Chronicles</h1>
                    <p className="text-muted lead mx-auto" style={{ maxWidth: "700px" }}>
                        Dive into expert articles written by our top doctors covering daily wellness, modern treatments, 
                        and breaking medical news.
                    </p>
                </div>
                <Blog />
            </div>
            <Footer />
        </div>
    );
}
