import { IconButton } from "@mui/material";
import { MdClose } from "react-icons/md";

interface Props {
    onClick: () => void;
}

const CloseButton = ({ onClick }: Props) => {
    return (
        <IconButton
            onClick={() => onClick()}
            sx={(theme) => ({
                position: "absolute",
                right: 8,
                top: 8,
                color: theme.palette.grey[500],
            })}
        >
            <MdClose />
        </IconButton>
    );
};

export default CloseButton;
