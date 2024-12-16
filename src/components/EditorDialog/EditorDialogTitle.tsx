import { DialogTitle } from "@mui/material";
import { EntityType } from "../../common/entity";

interface Props {
    isEditing: boolean;
    entityType: EntityType;
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
