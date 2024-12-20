import { TableCell } from "@mui/material";
import { useSession } from "../../auth/useSession";

const EntityActionHeader = () => {
    const { session } = useSession();

    return (
        <>
            {(session?.user?.rights.canModifyParts ||
                session?.user?.rights.canDeleteParts) && (
                <TableCell></TableCell>
            )}
        </>
    );
};

export default EntityActionHeader;
