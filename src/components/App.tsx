import { AppProvider } from "@toolpad/core/react-router-dom";
import { Navigation } from "@toolpad/core";
import { Outlet } from "react-router-dom";
import { FaMicrochip } from "react-icons/fa";
import { MdFactory } from "react-icons/md";
import MemoryIcon from "@mui/icons-material/Memory";

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
        segment: "manufacturers",
        title: "Manufacturers",
        icon: <MdFactory size={20} />,
    },
];

const App = () => {
    return (
        <AppProvider
            navigation={NAVIGATION}
            branding={{
                title: "Part Catalog",
                logo: <MemoryIcon fontSize="large" color="primary" />,
            }}
        >
            <Outlet />
        </AppProvider>
    );
};

export default App;
