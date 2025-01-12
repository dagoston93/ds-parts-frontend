import { createBrowserRouter, Navigate } from "react-router-dom";
import PartTable from "./components/PartTable";
import ManufacturerTable from "./components/ManufacturerTable";
import App from "./components/App";
import Layout from "./components/Layout";
import CategoryTable from "./components/CategoryTable";
import PackageTable from "./components/PackageTable";
import AppSignInPage from "./auth/AppSignInPage";
import ContainerTable from "./components/ContainerTable";
import PartDetailView from "./components/PartDetailView/PartDetailView";

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
                        path: "/parts/:id",
                        element: <PartDetailView />,
                    },
                    {
                        path: "/categories",
                        element: <CategoryTable />,
                    },
                    {
                        path: "/containers",
                        element: <ContainerTable />,
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
                path: "/signin",
                element: <AppSignInPage />,
            },
        ],
    },
]);

export default router;
