
import api from "../api/Axios";



export const fetchUserOrders = async (token) => {
    try {
        const response = await api.get("/api/orders", {
            headers: { Authorization: `Bearer ${token}` },
        }); 
        return response.data;
    } catch (error) {
        console.error('Error occured while fetching the orders', error);
        throw error;
    }
}

export const createOrder = async (orderData, token) => {
    try {
        const response = await api.post(
            "/api/orders/create",
            orderData,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        console.error('Error occured while creating the order', error);
        throw error;
    }
}

export const verifyPayment = async (paymentData, token) => {
    try {
        const response = await api.post(
            "/api/orders/verify",
            paymentData,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.status === 200;
    } catch (error) {
        console.error('Error occured while verifing the payment', error);
        throw error;
    }
}

export const deleteOrder = async (orderId, token) => {
    try {
        await api.delete("/api/orders/"+ orderId, {
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch (error) {
        console.error('Error occured while deleting the order', error);
        throw error;
    }
}