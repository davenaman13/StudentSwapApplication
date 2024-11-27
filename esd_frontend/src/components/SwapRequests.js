import React, { useState, useEffect } from "react";
import { fetchPendingRequests, fetchApplicantRequests, acceptSwapRequest } from "../utils/api";
import "../assets/swapRequests.css";

const SwapRequests = ({ applicantId, recipientId, token }) => {
    const [pendingRequests, setPendingRequests] = useState([]);
    const [applicantRequests, setApplicantRequests] = useState([]);
    const [error, setError] = useState(null);

    // Fetch pending requests for recipient
    useEffect(() => {
        const fetchPending = async () => {
            try {
                const data = await fetchPendingRequests(recipientId, token);
                setPendingRequests(data);
            } catch (err) {
                setError(err.message);
            }
        };
        if (recipientId) fetchPending();
    }, [recipientId, token]);

    // Fetch requests made by the logged-in applicant
    useEffect(() => {
        const fetchApplicant = async () => {
            try {
                const data = await fetchApplicantRequests(applicantId, token);
                setApplicantRequests(data);
            } catch (err) {
                setError(err.message);
            }
        };
        if (applicantId) fetchApplicant();
    }, [applicantId, token]);

    const handleAccept = async (requestId) => {
        try {
            await acceptSwapRequest(requestId, token);
            setPendingRequests((prev) => prev.filter((req) => req.id !== requestId)); // Remove accepted request
        } catch (err) {
            setError(err.message);
        }
    };

    if (error) return <p>Error: {error}</p>;

    return (
        <div className="requests-container">
            <h2>Pending Requests for You</h2>
            {pendingRequests.length === 0 ? (
                <p>No pending requests</p>
            ) : (
                pendingRequests.map((req) => (
                    <div key={req.id} className="request-card">
                        <p><strong>Applicant:</strong> {req.applicantName}</p>
                        <p><strong>Message:</strong> {req.applicantMessage}</p>
                        <button className="btn btn-success" onClick={() => handleAccept(req.id)}>Accept</button>
                    </div>
                ))
            )}

            <h2>Your Requests</h2>
            {applicantRequests.length === 0 ? (
                <p>No requests made</p>
            ) : (
                applicantRequests.map((req) => (
                    <div key={req.id} className="request-card">
                        <p><strong>Recipient:</strong> {req.recipientName}</p>
                        <p><strong>Message:</strong> {req.applicantMessage}</p>
                        <p><strong>Status:</strong> {req.status}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default SwapRequests;
