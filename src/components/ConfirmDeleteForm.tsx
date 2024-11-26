import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface Props {
    isOpen: boolean;
    partName: string;
    handleClose: (confirmed: boolean) => void;
}

const ConfirmDeleteForm = ({ isOpen, partName, handleClose }: Props) => {
    return (
        <Dialog
            open={isOpen}
            onClose={() => handleClose(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Delete part?</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete the following part?
                    <br />
                    <b>{partName}</b>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => handleClose(false)}
                    color="primary"
                    autoFocus
                >
                    Cancel
                </Button>
                <Button onClick={() => handleClose(true)} color="error">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDeleteForm;
