import { Button } from "@mui/material";
import { MdAdd } from "react-icons/md";
import { EntityType } from "../../common/entity";
import { useSession } from "../../auth/useSession";

interface Props {
    entityType: EntityType;
    onClick: () => void;
}

const CreateButton = ({ entityType, onClick }: Props) => {
    const { session } = useSession();

    if (!session?.user?.rights.canModifyParts) {
        return null;
    }

    return (
        <Button variant="contained" startIcon={<MdAdd />} onClick={onClick}>
            {`Create ${entityType.name}`}
        </Button>
    );
};

export default CreateButton;
