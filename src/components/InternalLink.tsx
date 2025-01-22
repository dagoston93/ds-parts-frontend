import { Link as MuiLink } from "@mui/material";
import { Link as RouterLink, To } from "react-router-dom";

interface Props {
    to: To;
    children: React.ReactNode;
}

const InternalLink = ({ to, children }: Props) => {
    return (
        <MuiLink component={RouterLink} to={to} underline="hover">
            {children}
        </MuiLink>
    );
};

export default InternalLink;
