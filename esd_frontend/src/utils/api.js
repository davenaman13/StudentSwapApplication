import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1";

// Student Authentication API
export const loginStudent = async (data) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/student/auth/login`, data);
        return response.data; // Return the JWT token
    } catch (error) {
        throw new Error(error.response?.data || "Login failed");
    }
};

// Swap Application API
const SWAP_API_BASE = `${API_BASE_URL}/swap`;

export const fetchPendingRequests = async (recipientId, token) => {
    try {
        const response = await axios.get(`${SWAP_API_BASE}/pending`, {
            params: { recipientId },
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || "Failed to fetch pending requests");
    }
};

export const acceptSwapRequest = async (requestId, token) => {
    try {
        const response = await axios.post(`${SWAP_API_BASE}/accept/${requestId}`, null, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || "Failed to accept swap request");
    }
};

export const rejectSwapRequest = async (requestId, token) => {
    try {
        const response = await axios.post(`${SWAP_API_BASE}/reject/${requestId}`, null, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || "Failed to reject swap request");
    }
};

export const createSwapRequest = async (applicantId, data, token) => {
    try {
        const response = await axios.post(`${SWAP_API_BASE}/request?applicantId=${applicantId}`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || "Failed to create swap request");
    }
};


export const fetchApplicantRequests = async (applicantId, token) => {
    try {
        const response = await axios.get(`${SWAP_API_BASE}/applicant`, {
            params: { applicantId }, // Send the applicant ID as a query parameter
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || "Failed to fetch applicant requests");
    }
};

