import api from "../api/Axios.js"




export const registerUser = async (data) => {
    try {
        const response = await api.post("/api/register", data);
        
        return response;
    } catch (error) {
        throw error.response?.data || "Registration failed";
    }
};

export const login = async (data) => {
    try {
        const response = await api.post( "/api/login", data);
        return response;
    } catch (error) {
        throw error.response?.data || "Login failed";
    }
};