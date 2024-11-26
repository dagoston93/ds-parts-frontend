import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { SnackbarProvider } from "notistack";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <SnackbarProvider
            maxSnack={4}
            autoHideDuration={5000}
            preventDuplicate={true}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
            <App />
        </SnackbarProvider>
    </StrictMode>
);
