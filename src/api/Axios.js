import axios from "axios";

// export const BASE_URL = "http://localhost:8080";
export const BASE_URL = "https://food-delivery-app-server-code.onrender.com/";


const api = axios.create({
  baseURL: BASE_URL,
});

//  Attaching  token to api
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    
  }
  return config;
});

//  Handle 403 
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = error.config?.url;

    // Only logout for protected APIs
    if (
      error.response?.status === 403 &&
      !url.includes("/login") &&
      !url.includes("/register")&& !url.includes("/")
    ) {
      localStorage.removeItem("token");
      alert("Session expired. Please login again.");
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default api;