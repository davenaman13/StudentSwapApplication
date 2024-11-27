import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import { jwtDecode } from "jwt-decode";


function App() {
    const [token, setToken] = useState(localStorage.getItem("token") || null);

    const handleLogin = (newToken) => {
        const decoded = jwtDecode(newToken);
        const userId = decoded.id; // Extract user ID from token
        setToken(newToken);
        localStorage.setItem("token", newToken);
        localStorage.setItem("userId", userId); // Save user ID in localStorage
    };

    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem("token"); // Clear token from localStorage
    };

    return (
        <Router>
            <Routes>
                <Route
                    path="/login"
                    element={
                        token ? <Navigate to="/home" replace /> : <Login onLogin={handleLogin} />
                    }
                />
                <Route
                    path="/home"
                    element={
                        token ? (
                            <Home token={token} onLogout={handleLogout} />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
