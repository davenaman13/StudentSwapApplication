import React, { useState } from "react";
import { loginStudent } from "../utils/httputils";
import jwt_decode from "jwt-decode";

export default function Login({ setToken, setUserDetails }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginStudent({ email, password });
            const token = response.data.token;
            setToken(token);

            // Decode the JWT token to extract user details
            const decoded = jwt_decode(token);
            setUserDetails({
                id: decoded.id, // Assuming the token contains "id"
                email: decoded.sub, // Assuming the token's subject is the email
            });
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
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
    );
}
