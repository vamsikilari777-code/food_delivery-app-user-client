import api from "../api/Axios"



export const fetchFoodList = async () => {
    try {
        const response = await api.get("/api/foods/foods-list");
        return response.data;
    } catch (error) {
        console.log('Error fetching food list:', error);
        throw error;
    }    
}

export const fetchFoodDetails = async (id) => {
    try {
        const response = await api.get("/api/foods/"+id);
        return response.data;
    } catch (error) {
        console.log('Error fetching food details:', error);
        throw error;
    }
    
}