import React from "react";
import SwapRequests from "./SwapRequests";
import CreateSwap from "./CreateSwap";
import "../assets/home.css";

const Home = ({ token, onLogout }) => {
    const userId = localStorage.getItem("userId"); // Replace with dynamic user ID

    return (
        <div className="home-container">
            <h1>Room Swap Dashboard</h1>
            <button className="logout-button" onClick={onLogout}>Logout</button>
            <div className="content">
                <CreateSwap applicantId={userId} token={token} />
                <SwapRequests applicantId={userId} recipientId={userId} token={token} />
            </div>
        </div>
    );
};

export default Home;
