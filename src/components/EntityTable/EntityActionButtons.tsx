import { IconButton, Stack } from "@mui/material";
import { MdDelete, MdEdit } from "react-icons/md";

interface Props {
    onEditButtonClick: () => void;
    onDeleteButtonClick: () => void;
}

const EntityActionButtons = ({
    onEditButtonClick,
    onDeleteButtonClick,
}: Props) => {
    return (
        <Stack direction="row" spacing={0}>
            <IconButton color="primary" onClick={onEditButtonClick}>
                <MdEdit />
            </IconButton>
            <IconButton color="error" onClick={onDeleteButtonClick}>
                <MdDelete />
            </IconButton>
        </Stack>
    );
};

export default EntityActionButtons;
