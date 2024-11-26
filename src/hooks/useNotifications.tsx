import { IconButton } from "@mui/material";
import { useSnackbar } from "notistack";
import { MdClose } from "react-icons/md";

function useNotifications() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const displayNotification = (
        message: string,
        variant: "success" | "error"
    ) => {
        enqueueSnackbar(message, {
            variant: variant,
            action: (id) => (
                <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => closeSnackbar(id)}
                >
                    <MdClose />
                </IconButton>
            ),
        });
    };

    const showError = (message: string) => {
        displayNotification(message, "error");
    };

    const showSuccess = (message: string) => {
        displayNotification(message, "success");
    };

    return { showError, showSuccess };
}

export default useNotifications;
