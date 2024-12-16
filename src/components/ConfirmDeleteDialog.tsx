import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { EntityType } from "../common/entity";

interface Props {
    isOpen: boolean;
    entityType: EntityType;
    entityName: string;
    handleClose: (confirmed: boolean) => void;
}

const ConfirmDeleteDialog = ({
    isOpen,
    entityType,
    entityName,
    handleClose,
}: Props) => {
    return (
        <Dialog open={isOpen} onClose={() => handleClose(false)}>
            <DialogTitle>Delete {entityType}?</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete the following {entityType}?
                    <br />
                    <b>{entityName}</b>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => handleClose(false)}
                    variant="outlined"
                    autoFocus
                >
                    Cancel
                </Button>
                <Button
                    onClick={() => handleClose(true)}
                    variant="contained"
                    color="error"
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDeleteDialog;
