import { IconButton, Stack, TableCell } from "@mui/material";
import { MdDelete, MdEdit } from "react-icons/md";
import { useSession } from "../../auth/useSession";

interface Props {
    onEditButtonClick: () => void;
    onDeleteButtonClick: () => void;
}

const EntityActionButtons = ({
    onEditButtonClick,
    onDeleteButtonClick,
}: Props) => {
    const { session } = useSession();

    if (
        !(
            session?.user?.rights.canModifyParts ||
            session?.user?.rights.canDeleteParts
        )
    ) {
        return null;
    }

    return (
        <TableCell align="right">
            <Stack direction="row" spacing={0}>
                {session?.user?.rights.canModifyParts && (
                    <IconButton color="primary" onClick={onEditButtonClick}>
                        <MdEdit />
                    </IconButton>
                )}
                {session?.user?.rights.canDeleteParts && (
                    <IconButton color="error" onClick={onDeleteButtonClick}>
                        <MdDelete />
                    </IconButton>
                )}
            </Stack>
        </TableCell>
    );
};

export default EntityActionButtons;
