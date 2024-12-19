import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:3000/api",
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
        config.headers["x-auth-token"] = token;
    }
    return config;
});

export default apiClient;
