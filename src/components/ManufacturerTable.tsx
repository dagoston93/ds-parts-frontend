import { CircularProgress } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import ConfirmDeleteDialog from "./ConfirmDeleteDialog";

import { useState } from "react";
import useEditorDialogState from "../hooks/useEditorDialogState";
import useNotifications from "../hooks/useNotifications";

import EntityActionButtons from "./EntityTable/EntityActionButtons";
import CreateButton from "./EntityTable/CreateButton";
import { Manufacturer } from "../services/manufacturerService";
import useManufacturers from "../hooks/manufacturers/useManufacturers";
import useDeleteManufacturer from "../hooks/manufacturers/useDeleteManufacturer";
import { ManufacturerEditorDialog } from "./ManufacturerEditorDialog";

const ManufacturerTable = () => {
    const { showSuccess, showError } = useNotifications();
    const { data: manufacturers, isLoading } = useManufacturers(showError);

    const deleteManufacturer = useDeleteManufacturer(showSuccess, showError);

    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [manufacturerToDelete, setManufacturerToDelete] =
        useState<Manufacturer | null>(null);
    const [confirmDeleteEntityName, setConfirmDeleteEntityName] = useState("");

    const editorDialogState = useEditorDialogState<Manufacturer>(null);

    const handleDeleteButtonClick = (manufacturer: Manufacturer) => {
        setManufacturerToDelete(manufacturer);
        setConfirmDeleteEntityName(manufacturer.name);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDeleteDialogClose = (confirmed: boolean) => {
        if (confirmed && manufacturerToDelete) {
            deleteManufacturer.mutate(manufacturerToDelete._id);
        }

        setManufacturerToDelete(null);
        setDeleteDialogOpen(false);
    };

    const handleCreateButtonClick = () => {
        editorDialogState.openDialog();
    };

    const handleEditButtonClick = (manufacturer: Manufacturer) => {
        editorDialogState.openDialog(manufacturer);
    };

    const handleEditorDialogClose = () => {
        editorDialogState.closeDialog();
    };

    return (
        <>
            <CreateButton
                entityType="manufacturer"
                onClick={handleCreateButtonClick}
            />
            <ManufacturerEditorDialog
                onClose={handleEditorDialogClose}
                isOpen={editorDialogState.isDialogOpen}
                initialManufacturer={editorDialogState.selectedEntity}
            />
            <ConfirmDeleteDialog
                handleClose={handleConfirmDeleteDialogClose}
                isOpen={isDeleteDialogOpen}
                entityType="manufacturer"
                entityName={confirmDeleteEntityName}
            />
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
                                <TableCell colSpan={2} align="center">
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
                                        onEditButtonClick={() =>
                                            handleEditButtonClick(manufacturer)
                                        }
                                        onDeleteButtonClick={() =>
                                            handleDeleteButtonClick(
                                                manufacturer
                                            )
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
