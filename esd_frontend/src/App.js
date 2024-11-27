import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Home from "./components/Home";
import CreateSwap from "./components/CreateSwap";
import SwapRequests from "./components/SwapRequests";
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
        localStorage.removeItem("userId"); // Clear user ID from localStorage
    };

    const userId = localStorage.getItem("userId"); // Fetch userId from localStorage

    return (
        <Router>
            {/* Navbar is displayed on all pages */}
            <Navbar token={token} onLogout={handleLogout} />

            {/* Main content routes */}
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
                <Route
                    path="/create-swap"
                    element={
                        token ? (
                            <CreateSwap applicantId={userId} token={token} />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />
                <Route
                    path="/requests"
                    element={
                        token ? (
                            <SwapRequests applicantId={userId} recipientId={userId} token={token} />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>

            {/* Footer is displayed on all pages */}
            <Footer />
        </Router>
    );
}

export default App;
