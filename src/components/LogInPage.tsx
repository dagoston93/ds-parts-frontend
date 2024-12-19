import { AuthProvider, SignInPage } from "@toolpad/core/SignInPage";
import { useNavigate } from "react-router-dom";
import { useSession } from "../auth/useSession";
import authService from "../auth/authService";

export default function LoginPage() {
    const { setSession } = useSession();
    const navigate = useNavigate();

    const handleLogin = async (
        provider: AuthProvider,
        formData?: any,
        callbackUrl?: String
    ) => {
        const { user, error } = await authService.login({
            email: formData.get("email"),
            password: formData.get("password"),
        });

        if (error || !user) {
            return Promise.resolve({ error });
        }

        const session = { user };

        setSession(session);
        navigate("/", { replace: true });

        return {};
    };

    return (
        <SignInPage
            providers={[{ id: "credentials", name: "Credentials" }]}
            signIn={handleLogin}
        />
    );
}
