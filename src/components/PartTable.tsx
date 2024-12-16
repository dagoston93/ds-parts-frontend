import { CircularProgress } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { Part } from "../services/partService";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import { PartEditorDialog } from "./PartEditorDialog";

import { useState } from "react";
import useEditorDialogState from "../hooks/useEditorDialogState";
import useNotifications from "../hooks/useNotifications";

import useParts from "../hooks/parts/useParts";
import useDeletePart from "../hooks/parts/useDeletePart";
import useIncrementPartCount from "../hooks/parts/useIncrementPartCount";
import useDecrementPartCount from "../hooks/parts/useDecrementPartCount";
import CountStepper from "./EntityTable/CountStepper";
import EntityActionButtons from "./EntityTable/EntityActionButtons";
import CreateButton from "./EntityTable/CreateButton";
import { ENTITY_TYPE_PART } from "../common/entity";

const PartTable = () => {
    const { showSuccess, showError } = useNotifications();
    const { data: parts, isLoading } = useParts(showError);

    const deletePart = useDeletePart(showSuccess, showError);

    const incrementPartCount = useIncrementPartCount(showError);
    const decrementPartCount = useDecrementPartCount(showError);
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [partToDelete, setPartToDelete] = useState<Part | null>(null);
    const [confirmDeleteEntityName, setConfirmDeleteEntityName] = useState("");

    const partEditorDialogState = useEditorDialogState<Part>(null);

    const handleDeletePartButtonClick = (part: Part) => {
        setPartToDelete(part);
        setConfirmDeleteEntityName(part.name);
        setDeleteDialogOpen(true);
    };

    const handleDeletePartDialogClose = (confirmed: boolean) => {
        if (confirmed && partToDelete) {
            deletePart.mutate(partToDelete._id);
        }

        setPartToDelete(null);
        setDeleteDialogOpen(false);
    };

    const handleCreatePartButtonClick = () => {
        partEditorDialogState.openDialog();
    };

    const handleEditPartButtonClick = (part: Part) => {
        partEditorDialogState.openDialog(part);
    };

    const handlePartEditorDialogClose = () => {
        partEditorDialogState.closeDialog();
    };

    const handleIncrementPartCountButtonClick = (part: Part) => {
        incrementPartCount.mutate(part._id);
    };

    const handleDecrementPartCountButtonClick = (part: Part) => {
        decrementPartCount.mutate(part._id);
    };

    return (
        <>
            <CreateButton
                entityType={ENTITY_TYPE_PART}
                onClick={handleCreatePartButtonClick}
            />
            <PartEditorDialog
                onClose={handlePartEditorDialogClose}
                isOpen={partEditorDialogState.isDialogOpen}
                initialPart={partEditorDialogState.selectedEntity}
            />
            <ConfirmDeleteDialog
                handleClose={handleDeletePartDialogClose}
                isOpen={isDeleteDialogOpen}
                entityType={ENTITY_TYPE_PART}
                entityName={confirmDeleteEntityName}
            />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Part</TableCell>
                            <TableCell align="right">Manufacturer</TableCell>
                            <TableCell align="right">Package</TableCell>
                            <TableCell align="right">Package type</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="center" colSpan={2}>
                                Count
                            </TableCell>
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
                        {parts?.map((part) => (
                            <TableRow key={part._id}>
                                <TableCell align="left">{part.name}</TableCell>
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
                                    <CountStepper
                                        onUpButtonClick={() => {
                                            handleIncrementPartCountButtonClick(
                                                part
                                            );
                                        }}
                                        onDownButtonClick={() => {
                                            handleDecrementPartCountButtonClick(
                                                part
                                            );
                                        }}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <EntityActionButtons
                                        onEditButtonClick={() =>
                                            handleEditPartButtonClick(part)
                                        }
                                        onDeleteButtonClick={() =>
                                            handleDeletePartButtonClick(part)
                                        }
                                    />
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
