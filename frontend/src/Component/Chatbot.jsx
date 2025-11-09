import { useState, useRef, useEffect } from "react";
import { Button, Form } from "react-bootstrap";

export default function Chatbot() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: "bot", text: "👋 Hello! I’m your Health Assistant. How can I help you today?" },
    ]);
    const [input, setInput] = useState("");
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { sender: "user", text: input };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");

        setTimeout(() => {
        const lower = input.toLowerCase();
        let reply = "🤖 I’m not sure, but I can connect you with support.";

        if (lower.includes("hello") || lower.includes("hi"))
            reply = "👋 Hi there! How can I assist you today?";
        else if (lower.includes("booking") || lower.includes("appointment"))
            reply = "📅 You can book an appointment from the top-right 'Book Appointment' button.";
        else if (lower.includes("doctor"))
            reply = "🩺 We have specialized doctors in every department — cardiology, neurology, pediatrics, and more!";
        else if (lower.includes("time") || lower.includes("hours"))
            reply = "🕒 Visiting hours are from 9 AM - 7 PM (Mon-Sat).";
        else if (lower.includes("thanks"))
            reply = "😊 You’re welcome! Take care and stay healthy!";

        setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
        }, 600);
    };

    return (
        <div
        style={{
            position: "fixed",
            bottom: "25px",
            right: "25px",
            zIndex: "9999",
        }}
        >
        {open && (
            <div
            className="shadow-lg rounded-4 bg-white p-3 d-flex flex-column"
            style={{
                width: "300px",
                height: "400px",
                border: "1px solid #cce5ff",
                animation: "fadeIn 0.3s ease",
            }}
            >
            <div
                className="fw-bold text-white d-flex justify-content-between align-items-center px-2 py-2 rounded-3"
                style={{ backgroundColor: "#0d6efd" }}
            >
                <span>💬 HealthBot</span>
                <Button
                size="sm"
                variant="light"
                onClick={() => setOpen(false)}
                style={{ fontSize: "0.8rem" }}
                >
                ✕
                </Button>
            </div>

            <div
                className="flex-grow-1 my-2 p-2 rounded"
                style={{
                background: "#f8f9fa",
                overflowY: "auto",
                fontSize: "0.9rem",
                }}
            >
                {messages.map((msg, i) => (
                <div
                    key={i}
                    className={`d-flex mb-2 ${
                    msg.sender === "user" ? "justify-content-end" : "justify-content-start"
                    }`}
                >
                    <div
                    className={`p-2 rounded-3 ${
                        msg.sender === "user"
                        ? "bg-primary text-white"
                        : "bg-light text-dark border"
                    }`}
                    style={{
                        maxWidth: "80%",
                        wordWrap: "break-word",
                        borderRadius:
                        msg.sender === "user"
                            ? "15px 15px 0 15px"
                            : "15px 15px 15px 0",
                    }}
                    >
                    {msg.text}
                    </div>
                </div>
                ))}
                <div ref={chatEndRef}></div>
            </div>

            <Form onSubmit={handleSend} className="d-flex gap-2 mt-2">
                <Form.Control
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="rounded-pill"
                />
                <Button type="submit" variant="primary" className="rounded-pill px-3">
                ➤
                </Button>
            </Form>
            </div>
        )}

        {!open && (
            <Button
            variant="primary"
            className="rounded-circle p-3 shadow"
            onClick={() => setOpen(true)}
            style={{
                width: "60px",
                height: "60px",
                fontSize: "1.2rem",
                backgroundColor: "#1e5cb9ff",
            }}
            >
            💬
            </Button>
        )}
        </div>
    );
}
