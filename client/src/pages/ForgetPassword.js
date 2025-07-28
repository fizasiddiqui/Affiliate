// src/pages/ForgetPassword.js
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { serverEndpoint } from "../config/config";

function ForgetPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${serverEndpoint}/auth/send-reset-password-token`, { email });
            setMessage("Reset code sent to your email.");
            setTimeout(() => navigate("/reset-password", { state: { email } }), 1500);
        } catch (err) {
            setError("Failed to send reset code. Try again.");
        }
    };
    return (
        <section className="card reset-password-card">
            <h3 className="text-center mb-4">Forgot Password</h3>
            {message && <div className="form-success">{message}</div>}
            {error && <div className="form-error">{error}</div>}
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button className="btn-primary full-width">Send Reset Code</button>
            </form>
        </section>
    );
}

export default ForgetPassword;
