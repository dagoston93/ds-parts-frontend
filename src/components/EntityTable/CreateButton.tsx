import { Button } from "@mui/material";
import { MdAdd } from "react-icons/md";

interface Props {
    entityType: string;
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
