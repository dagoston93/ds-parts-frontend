import { Navigate, Outlet } from "react-router-dom";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { useSession } from "../auth/useSession";

const Layout = () => {
    const { session } = useSession();

    if (!session) {
        const redirectTo = `/signin?callbackUrl=${encodeURIComponent(location.pathname)}`;

        return <Navigate to={redirectTo} replace={true} />;
    }

    return (
        <DashboardLayout>
            <PageContainer breadcrumbs={[]}>
                <Outlet />
            </PageContainer>
        </DashboardLayout>
    );
};

export default Layout;
