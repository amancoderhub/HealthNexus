import React from "react";
import TopNavbar from "../Component/TopNavbar";
import Hero from "../Component/Hero";
import Specialities from "../Component/specialities";
import Facilities from "../Component/Facilities";
import Testonomial from "../Component/Testonomial"
import Faq from "../Component/Faq";
import Blog from "../Component/Blog"
import Footer from "../Component/Footer";
import Chatbot from "../Component/Chatbot";

export default function Landing() {
    return (
        <>
        <TopNavbar />
        <Hero />
        <Specialities />
        <Facilities />
        <Testonomial />
        <Faq />
        <Blog />
        <Footer />
        <Chatbot />
        </>
    );
}
