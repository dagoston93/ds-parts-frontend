import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SnackbarProvider } from "notistack";
import { RouterProvider } from "react-router-dom";
import router from "./routes.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <SnackbarProvider
            maxSnack={4}
            autoHideDuration={5000}
            preventDuplicate={true}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
            <RouterProvider router={router} />
        </SnackbarProvider>
    </StrictMode>
);
