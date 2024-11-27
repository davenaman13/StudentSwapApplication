import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/navbar.css";

const Navbar = ({ token, onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <h2>Room Swap App</h2>
            </div>
            <div className="navbar-links">
                <Link to="/home">Home</Link>
                <Link to="/create-swap">Create Swap Request</Link>
                <Link to="/requests">View Requests</Link>
                {token ? (
                    <button className="logout-button" onClick={handleLogout}>
                        Logout
                    </button>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
