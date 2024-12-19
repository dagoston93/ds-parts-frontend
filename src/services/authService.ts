import axios from "axios";
import apiClient from "./apiClient";
import { jwtDecode } from "jwt-decode";

export interface User {
    name: string;
    rights: {
        canModifyParts: boolean;
        canDeleteParts: boolean;
        canModifyUsers: boolean;
        canDeleteUsers: boolean;
    };
}

interface JwtPayload {
    user: User;
}

export interface LoginFormData {
    email: string;
    password: string;
}

interface LoginResponse {
    user: User | null;
    error: string | null;
}

const loginEndpoint = "/auth";
const logoutEndpoint = "/auth/logout";

class AuthService {
    login = async (formData: LoginFormData): Promise<LoginResponse> => {
        try {
            const response = await apiClient.post(loginEndpoint, formData);
            const token = response.data;

            const decoded = jwtDecode<JwtPayload>(token);
            const user = decoded.user;

            localStorage.setItem("authToken", token);
            return { user, error: null };
        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.status === 400) {
                return { user: null, error: "Invalid e-mail or password." };
            }

            return { user: null, error: "Unexpected error." };
        }
    };

    logout = async () => {
        await apiClient.post(logoutEndpoint);
        localStorage.removeItem("authToken");
    };
}

export default new AuthService();
