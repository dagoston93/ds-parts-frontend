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
import { Manufacturer } from "../services/manufacturerService";
import useManufacturers from "../hooks/manufacturers/useManufacturers";

const ManufacturerTable = () => {
    const { showSuccess, showError } = useNotifications();
    const { data: manufacturers, isLoading } = useManufacturers(showError);

    // const deletePart = useDeletePart(showSuccess, showError);

    // const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    // const [partToDelete, setPartToDelete] = useState<Part | null>(null);
    // const [confirmDeleteEntityName, setConfirmDeleteEntityName] = useState("");
    // const [confirmDeleteEntityType, setConfirmDeleteEntityType] = useState("");

    // const partEditorDialogState = useEditorDialogState<Part>(null);

    // const handleDeletePartButtonClick = (part: Part) => {
    //     setPartToDelete(part);
    //     setConfirmDeleteEntityName(part.name);
    //     setConfirmDeleteEntityType("part");
    //     setDeleteDialogOpen(true);
    // };

    // const handleDeletePartDialogClose = (confirmed: boolean) => {
    //     if (confirmed && partToDelete) {
    //         deletePart.mutate(partToDelete._id);
    //     }

    //     setPartToDelete(null);
    //     setDeleteDialogOpen(false);
    // };

    // const handleCreatePartButtonClick = () => {
    //     partEditorDialogState.openDialog();
    // };

    // const handleEditPartButtonClick = (part: Part) => {
    //     partEditorDialogState.openDialog(part);
    // };

    // const handlePartEditorDialogClose = () => {
    //     partEditorDialogState.closeDialog();
    // };

    // const handleIncrementPartCountButtonClick = (part: Part) => {
    //     incrementPartCount.mutate(part._id);
    // };

    // const handleDecrementPartCountButtonClick = (part: Part) => {
    //     decrementPartCount.mutate(part._id);
    // };

    return (
        <>
            <CreateButton
                entityType="manufacturer"
                onClick={/*handleCreatePartButtonClick*/ () => {}}
            />
            {/* <PartEditorDialog
                onClose={handlePartEditorDialogClose}
                isOpen={partEditorDialogState.isDialogOpen}
                initialPart={partEditorDialogState.selectedEntity}
            /> */}
            {/* <ConfirmDeleteDialog
                handleClose={handleDeletePartDialogClose}
                isOpen={isDeleteDialogOpen}
                entityType={confirmDeleteEntityType}
                entityName={confirmDeleteEntityName}
            /> */}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Manufacturer</TableCell>
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
                        {manufacturers?.map((manufacturer) => (
                            <TableRow key={manufacturer._id}>
                                <TableCell align="left">
                                    {manufacturer.name}
                                </TableCell>
                                <TableCell align="right">
                                    <EntityActionButtons
                                        onEditButtonClick={
                                            () => {}
                                            //handleEditPartButtonClick(part)
                                        }
                                        onDeleteButtonClick={
                                            () => {}
                                            //handleDeletePartButtonClick(part)
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

export default ManufacturerTable;
