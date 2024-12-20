import axios from "axios";
import tokenStorage from "../auth/tokenStorage";

const apiClient = axios.create({
    baseURL: "http://localhost:3000/api",
});

apiClient.interceptors.request.use((config) => {
    const token = tokenStorage.getToken();
    if (token) {
        config.headers["x-auth-token"] = token;
    }
    return config;
});

export default apiClient;
