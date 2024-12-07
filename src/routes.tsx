import { createBrowserRouter } from "react-router-dom";
import PartTable from "./components/PartTable";
import ManufacturerTable from "./components/ManufacturerTable";

const router = createBrowserRouter([
    {
        path: "/",
        element: <PartTable />,
    },
    {
        path: "/manufacturers",
        element: <ManufacturerTable />,
    },
]);

export default router;
