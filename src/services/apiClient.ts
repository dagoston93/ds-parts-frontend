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

export function registerAuthErrorHandler(callback: () => void) {
    apiClient.interceptors.response.use(
        (response) => response,
        async (error) => {
            if (error.response?.status === 401) {
                callback();
            }

            return Promise.reject(error);
        }
    );
}

export default apiClient;
