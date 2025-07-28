import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { serverEndpoint } from "../config/config";

function ResetPassword({ email: emailProp = "", hideEmailField = false, onSuccess }) {
    const location = useLocation();
    const navigate = useNavigate();
    const emailFromState = location.state?.email || emailProp;
    const shouldHideEmail = hideEmailField || !!emailProp || !!location.state?.email;

    const [formData, setFormData] = useState({
        email: emailFromState,
        code: "",
        newPassword: ""
    });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Frontend validation
        if (!formData.email || !formData.code || !formData.newPassword) {
            setError("Please fill in all fields.");
            return;
        }
        try {
            await axios.post(`${serverEndpoint}/auth/reset-password`, formData);
            setMessage("Password reset successful.");
            setError("");
            setTimeout(() => {
                if (onSuccess) {
                    onSuccess();
                } else {
                    navigate("/");
                }
            }, 1500);
        } catch (err) {
            let backendMsg = err?.response?.data?.message;
            setError(backendMsg || "Failed to reset password. Check code or try again.");
        }
    };

    return (
        <section className="card reset-password-card">
            <h3 className="text-center mb-4">Reset Password</h3>
            {message && <div className="form-success" role="alert">{message}</div>}
            {error && <div className="form-error" role="alert">{error}</div>}
            <form onSubmit={handleSubmit} className="form">
                {!shouldHideEmail && (
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                    </div>
                )}
                <div className="form-group">
                    <label htmlFor="code">Reset Code</label>
                    <input type="text" id="code" name="code" value={formData.code} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input type="password" id="newPassword" name="newPassword" value={formData.newPassword} onChange={handleChange} />
                </div>
                <button className="btn-primary full-width">Reset Password</button>
            </form>
        </section>
    );
}
export default ResetPassword;