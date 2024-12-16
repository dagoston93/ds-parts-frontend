import { Button } from "@mui/material";
import { MdAdd } from "react-icons/md";
import { EntityType } from "../../common/entity";

interface Props {
    entityType: EntityType;
    onClick: () => void;
}

const CreateButton = ({ entityType, onClick }: Props) => {
    return (
        <Button variant="contained" startIcon={<MdAdd />} onClick={onClick}>
            {`Create ${entityType}`}
        </Button>
    );
};

export default CreateButton;
