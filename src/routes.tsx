import { createBrowserRouter, Navigate } from "react-router-dom";
import PartTable from "./components/PartTable";
import ManufacturerTable from "./components/ManufacturerTable";
import App from "./components/App";
import Layout from "./components/Layout";
import CategoryTable from "./components/CategoryTable";
import PackageTable from "./components/PackageTable";
import LogInPage from "./components/LogInPage";

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
                        path: "/categories",
                        element: <CategoryTable />,
                    },
                    {
                        path: "/manufacturers",
                        element: <ManufacturerTable />,
                    },
                    {
                        path: "/packages",
                        element: <PackageTable />,
                    },
                ],
            },
            {
                path: "/sign-in",
                element: <LogInPage />,
            },
        ],
    },
]);

export default router;
