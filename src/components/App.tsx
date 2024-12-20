import CircularProgress from "@mui/material/CircularProgress";
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
import tokenStorage from "../auth/tokenStorage";
import { registerAuthErrorHandler } from "../services/apiClient";
import { Box } from "@mui/material";

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

    const endSession = () => {
        setSession(null);
        navigate("/signin");
    };

    const signIn = useCallback(() => {
        navigate("/signin");
    }, [navigate]);

    const signOut = useCallback(() => {
        authService.signOut();
        endSession();
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

    useEffect(() => {
        // Handle if session is changed from another tab, e.g. Sign out
        const removeStorageChangeHandler =
            tokenStorage.registerStorageChangeHandler(() => {
                const updatedUser = authService.getCurrentUser();
                if (updatedUser) {
                    setSession({ user: updatedUser });
                } else {
                    endSession();
                }
            });

        // Remove event listener on unmount
        return removeStorageChangeHandler;
    }, [navigate]);

    useEffect(() => {
        registerAuthErrorHandler(() => {
            endSession();
            tokenStorage.removeToken();
        });
    }, [navigate]);

    if (isCheckingToken) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
                <CircularProgress size="3rem" />
            </Box>
        );
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
                authentication={{ signIn: signIn, signOut: signOut }}
            >
                <Outlet />
            </AppProvider>
        </SessionContext.Provider>
    );
};

export default App;
