import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginStudent } from "../utils/api";
import "../assets/login.css";

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = await loginStudent({ email, password });
            onLogin(token); // Pass the JWT token to App
            navigate("/home"); // Redirect to home page
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
