import { useNavigate } from "react-router-dom";
import { useSession } from "../auth/useSession";
import { SignInPage } from "@toolpad/core/SignInPage";

const LogInPage = () => {
    const { setSession } = useSession();
    const navigate = useNavigate();

    return (
        <SignInPage
            providers={[{ id: "credentials", name: "Credentials" }]}
            signIn={(provider, formData) => {
                if (formData.get("password") === "password") {
                    setSession({ user: { name: "Agoston" } });
                    navigate("/");
                } else {
                    //return { error: "Invalid credentials" };
                }
                //return {};
            }}
        />
    );
};

export default LogInPage;
