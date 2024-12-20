import { AuthProvider, SignInPage } from "@toolpad/core/SignInPage";
import { Navigate, useNavigate } from "react-router-dom";
import { useSession } from "../auth/useSession";
import authService from "../auth/authService";

export default function LoginPage() {
    const navigate = useNavigate();
    const { session, setSession } = useSession();

    if (session) {
        return <Navigate to={"/"} />;
    }

    const handleLogin = async (
        provider: AuthProvider,
        formData?: any,
        callbackUrl?: String
    ) => {
        const { user, error } = await authService.login({
            email: formData.get("email"),
            password: formData.get("password"),
            remember: formData.get("remember"),
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
