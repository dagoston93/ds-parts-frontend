import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { CircularProgress, IconButton } from "@mui/material";
import { MdDelete, MdEdit, MdClose } from "react-icons/md";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import useParts from "../hooks/useParts";
import { useState } from "react";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import partService, { Part } from "../services/partService";
import useNotifications from "../hooks/useNotifications";

const PartTable = () => {
    const { showSuccess, showError } = useNotifications();
    const { parts, isLoading, setParts } = useParts(showError);
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [partToDelete, setPartToDelete] = useState<Part | null>();

    const handleDeletePartButtonClick = (part: Part) => {
        setPartToDelete(part);
        setDeleteDialogOpen(true);
    };

    const handleDeletePartFormClose = (confirmed: boolean) => {
        if (confirmed && partToDelete) {
            const originalParts = [...parts];
            setParts(parts.filter((p) => p._id !== partToDelete._id));

            partService
                .delete(partToDelete._id)
                .then(() => {
                    showSuccess(`Part deleted: ${partToDelete.name}`);
                    console.log();
                })
                .catch((err) => {
                    showError(err.message);
                    setParts(originalParts);
                });
        }

        setPartToDelete(null);
        setDeleteDialogOpen(false);
    };

    return (
        <>
            <ConfirmDeleteDialog
                handleClose={handleDeletePartFormClose}
                isOpen={isDeleteDialogOpen}
                partName={partToDelete?.name || ""}
            />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Part</TableCell>
                            <TableCell align="right">Manufacturer</TableCell>
                            <TableCell align="right">Package</TableCell>
                            <TableCell align="right">Package type</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right" sx={{ paddingRight: 0 }}>
                                Count
                            </TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading && (
                            <TableRow>
                                <TableCell colSpan={8} align="center">
                                    <CircularProgress size="3rem" />
                                </TableCell>
                            </TableRow>
                        )}
                        {parts.map((part) => (
                            <TableRow
                                key={part._id}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {part.name}
                                </TableCell>
                                <TableCell align="right">
                                    {part.manufacturer?.name || "Unknown"}
                                </TableCell>
                                <TableCell align="right">
                                    {part.partPackage?.name || "Unknown"}
                                </TableCell>
                                <TableCell align="right">
                                    {part.partPackage?.type || "Unknown"}
                                </TableCell>
                                <TableCell align="right">
                                    ${part.price.toFixed(2)}
                                </TableCell>
                                <TableCell
                                    align="right"
                                    sx={{ paddingRight: 0 }}
                                >
                                    {part.count}
                                </TableCell>
                                <TableCell align="left" sx={{ paddingLeft: 0 }}>
                                    <Stack spacing={0}>
                                        <IconButton
                                            aria-label="increase count"
                                            color="primary"
                                            sx={{ paddingBottom: 0 }}
                                        >
                                            <FaCaretUp />
                                        </IconButton>
                                        <IconButton
                                            aria-label="decrease count"
                                            color="primary"
                                            sx={{ paddingTop: 0 }}
                                        >
                                            <FaCaretDown />
                                        </IconButton>
                                    </Stack>
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        aria-label="edit"
                                        color="primary"
                                    >
                                        <MdEdit />
                                    </IconButton>
                                    <IconButton
                                        aria-label="delete"
                                        color="error"
                                        onClick={() =>
                                            handleDeletePartButtonClick(part)
                                        }
                                    >
                                        <MdDelete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default PartTable;
