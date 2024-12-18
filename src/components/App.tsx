import { AppProvider } from "@toolpad/core/react-router-dom";
import { Navigation, Session } from "@toolpad/core";
import { Outlet, useNavigate } from "react-router-dom";
import { FaMicrochip } from "react-icons/fa";
import { MdCategory, MdFactory } from "react-icons/md";
import { VscCircuitBoard } from "react-icons/vsc";
import MemoryIcon from "@mui/icons-material/Memory";
import { useCallback, useMemo, useState } from "react";
import { SessionContext } from "../auth/useSession";

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
    const [session, setSession] = useState<Session | null>(null);
    const navigate = useNavigate();

    const signIn = useCallback(() => {
        navigate("/sign-in");
    }, [navigate]);

    const signOut = useCallback(() => {
        setSession(null);
        navigate("/sign-in");
    }, [navigate]);

    const sessionContextValue = useMemo(
        () => ({ session, setSession }),
        [session, setSession]
    );

    return (
        <SessionContext.Provider value={sessionContextValue}>
            <AppProvider
                navigation={NAVIGATION}
                branding={{
                    title: "Part Catalog",
                    logo: <MemoryIcon fontSize="large" color="primary" />,
                }}
            >
                <Outlet />
            </AppProvider>
        </SessionContext.Provider>
    );
};

export default App;
