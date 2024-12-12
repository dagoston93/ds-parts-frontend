import LoadingButton from "@mui/lab/LoadingButton";
import { MdAdd, MdSave } from "react-icons/md";

interface Props {
    isEditing: boolean;
    isLoading: boolean;
    disabled: boolean;
}

const SubmitDialogButton = ({ isEditing, isLoading, disabled }: Props) => {
    return (
        <LoadingButton
            type="submit"
            variant="contained"
            startIcon={isEditing ? <MdSave /> : <MdAdd />}
            loading={isLoading}
            disabled={disabled}
        >
            {isEditing ? "Save" : "Create"}
        </LoadingButton>
    );
};

export default SubmitDialogButton;
