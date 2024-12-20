import { AuthProvider, SignInPage } from "@toolpad/core/SignInPage";
import { Navigate, useNavigate } from "react-router-dom";
import { useSession } from "./useSession";
import authService from "./authService";

const AppSignInPage = () => {
    const navigate = useNavigate();
    const { session, setSession } = useSession();

    if (session) {
        return <Navigate to={"/"} />;
    }

    const handleSignIn = async (
        _: AuthProvider,
        formData?: any,
        callbackUrl?: string
    ) => {
        const { user, error } = await authService.signIn({
            email: formData.get("email"),
            password: formData.get("password"),
            remember: formData.get("remember"),
        });

        if (error || !user) {
            return Promise.resolve({ error });
        }

        const session = { user };

        setSession(session);
        navigate(callbackUrl || "/", { replace: true });

        return {};
    };

    return (
        <SignInPage
            providers={[{ id: "credentials", name: "Credentials" }]}
            signIn={handleSignIn}
        />
    );
};

export default AppSignInPage;
