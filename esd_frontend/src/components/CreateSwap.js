import React, { useState } from "react";
import { createSwapRequest } from "../utils/api";
import "../assets/createSwap.css";

const CreateSwap = ({ applicantId, token }) => {
    const [recipientId, setRecipientId] = useState("");
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createSwapRequest(applicantId, { recipientId, applicantMessage: message }, token);
            setSuccess("Swap request created successfully!");
            setError(null);
            setRecipientId("");
            setMessage("");
        } catch (err) {
            setError(err.message);
            setSuccess(null);
        }
    };

    return (
        <div className="create-swap-container">
            <h2>Create Swap Request</h2>
            {success && <p className="success-message">{success}</p>}
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>Recipient ID:</label>
                <input
                    type="number"
                    value={recipientId}
                    onChange={(e) => setRecipientId(e.target.value)}
                    required
                />
                <label>Message:</label>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />
                <button type="submit">Send Request</button>
            </form>
        </div>
    );
};

export default CreateSwap;
