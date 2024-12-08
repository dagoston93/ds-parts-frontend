import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import router from "./routes.tsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 30_000,
        },
    },
});

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <SnackbarProvider
                maxSnack={4}
                autoHideDuration={5000}
                preventDuplicate={true}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <RouterProvider router={router} />
            </SnackbarProvider>
        </QueryClientProvider>
    </StrictMode>
);
