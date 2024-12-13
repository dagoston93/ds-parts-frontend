import { DialogTitle } from "@mui/material";

interface Props {
    isEditing: boolean;
    entityType: string;
}

const EditorDialogTitle = ({ isEditing, entityType }: Props) => {
    return (
        <DialogTitle>
            {isEditing ? "Edit " : "Create "}
            {entityType}
        </DialogTitle>
    );
};

export default EditorDialogTitle;
