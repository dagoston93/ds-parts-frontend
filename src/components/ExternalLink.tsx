import { Link } from "@mui/material";

interface Props {
    to: string;
    children: React.ReactNode;
}

const ExternalLink = ({ to, children }: Props) => {
    return (
        <Link
            href={to}
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
        >
            {children}
        </Link>
    );
};

export default ExternalLink;
