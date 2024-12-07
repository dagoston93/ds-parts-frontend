import { createBrowserRouter, Navigate } from "react-router-dom";
import PartTable from "./components/PartTable";
import ManufacturerTable from "./components/ManufacturerTable";
import App from "./components/App";
import Layout from "./components/Layout";

const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                path: "/",
                element: <Layout />,
                children: [
                    {
                        index: true,
                        element: <Navigate to="/parts" replace />,
                    },
                    {
                        path: "/parts",
                        element: <PartTable />,
                    },
                    {
                        path: "/manufacturers",
                        element: <ManufacturerTable />,
                    },
                ],
            },
        ],
    },
]);

export default router;
