import { AppProvider } from "@toolpad/core/react-router-dom";
import { Navigation, Session } from "@toolpad/core";
import { Outlet, useNavigate } from "react-router-dom";
import { FaMicrochip } from "react-icons/fa";
import { MdCategory, MdFactory } from "react-icons/md";
import { VscCircuitBoard } from "react-icons/vsc";
import MemoryIcon from "@mui/icons-material/Memory";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SessionContext } from "../auth/useSession";
import authService from "../auth/authService";

const NAVIGATION: Navigation = [
    {
        kind: "header",
        title: "Entities",
    },
    {
        segment: "parts",
        title: "Parts",
        icon: <FaMicrochip size={20} />,
    },
    {
        segment: "categories",
        title: "Categories",
        icon: <MdCategory size={20} />,
    },
    {
        segment: "manufacturers",
        title: "Manufacturers",
        icon: <MdFactory size={20} />,
    },
    {
        segment: "packages",
        title: "Packages",
        icon: <VscCircuitBoard size={20} />,
    },
];

const App = () => {
    const navigate = useNavigate();
    const [session, setSession] = useState<Session | null>(null);
    const [isCheckingToken, setIsCheckingToken] = useState(true);

    const login = useCallback(() => {
        navigate("/login");
    }, [navigate]);

    const logout = useCallback(() => {
        authService.logout();
        setSession(null);
        navigate("/login");
    }, [navigate]);

    const sessionContextValue = useMemo(
        () => ({ session, setSession }),
        [session, setSession]
    );

    useEffect(() => {
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
            setSession({ user: currentUser });
        }

        setIsCheckingToken(false);
    }, []);

    if (isCheckingToken) {
        return null;
    }

    return (
        <SessionContext.Provider value={sessionContextValue}>
            <AppProvider
                navigation={NAVIGATION}
                branding={{
                    title: "Part Catalog",
                    logo: <MemoryIcon fontSize="large" color="primary" />,
                }}
                session={session}
                authentication={{ signIn: login, signOut: logout }}
            >
                <Outlet />
            </AppProvider>
        </SessionContext.Provider>
    );
};

export default App;
