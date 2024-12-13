import { Button, DialogActions } from "@mui/material";
import SubmitDialogButton from "./SubmitDialogButton";

interface Props {
    isEditing: boolean;
    isLoading: boolean;
    isValid: boolean;
    onClose: () => void;
}

const EditorDialogActions = ({
    isEditing,
    isLoading,
    isValid,
    onClose,
}: Props) => {
    return (
        <DialogActions>
            <Button
                onClick={() => onClose()}
                variant="outlined"
                disabled={isLoading}
            >
                Cancel
            </Button>
            <SubmitDialogButton
                isEditing={isEditing}
                isLoading={isLoading}
                disabled={!isValid}
            />
        </DialogActions>
    );
};

export default EditorDialogActions;
