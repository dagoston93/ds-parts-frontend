import axios from "axios";
import apiClient from "../services/apiClient";
import { jwtDecode } from "jwt-decode";
import tokenStorage from "./tokenStorage";

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

export interface SignInFormData {
    email: string;
    password: string;
    remember?: string | null;
}

interface SignInResponse {
    user: User | null;
    error: string | null;
}

const signInEndpoint = "/auth";
const signOutEndpoint = "/auth/logout";

class AuthService {
    signIn = async (formData: SignInFormData): Promise<SignInResponse> => {
        try {
            const response = await apiClient.post(signInEndpoint, {
                email: formData.email,
                password: formData.password,
            });
            const token = response.data;

            const decoded = jwtDecode<JwtPayload>(token);
            const user = decoded.user;

            if (formData.remember) {
                tokenStorage.setStorageType("LOCAL");
            } else {
                tokenStorage.setStorageType("SESSION");
            }

            tokenStorage.saveToken(token);
            return { user, error: null };
        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.status === 400) {
                return { user: null, error: "Invalid e-mail or password." };
            }

            return { user: null, error: "Unexpected error." };
        }
    };

    signOut = async () => {
        tokenStorage.removeToken();
        await apiClient.post(signOutEndpoint);
    };

    getCurrentUser() {
        try {
            const token = tokenStorage.getToken();
            if (!token) {
                return null;
            }

            const decoded = jwtDecode<JwtPayload>(token);
            return decoded.user;
        } catch {
            return null;
        }
    }
}

export default new AuthService();
