import { IconButton, Stack } from "@mui/material";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

interface Props {
    onUpButtonClick: () => void;
    onDownButtonClick: () => void;
}

const CountStepper = ({ onUpButtonClick, onDownButtonClick }: Props) => {
    return (
        <Stack spacing={-1}>
            <IconButton
                color="primary"
                sx={{ paddingBottom: 0 }}
                onClick={onUpButtonClick}
            >
                <FaCaretUp />
            </IconButton>
            <IconButton
                color="primary"
                sx={{ paddingTop: 0 }}
                onClick={onDownButtonClick}
            >
                <FaCaretDown />
            </IconButton>
        </Stack>
    );
};

export default CountStepper;
