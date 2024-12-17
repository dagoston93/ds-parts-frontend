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
import { Package } from "../services/packageService";
import usePackages from "../hooks/packages/usePackages";
import useDeletePackage from "../hooks/packages/useDeletePackage";
//import { PackageEditorDialog } from "./PackageEditorDialog";
import { ENTITY_TYPE_PACKAGE } from "../common/entity";

const PackageTable = () => {
    const { showSuccess, showError } = useNotifications();
    const { data: packages, isLoading } = usePackages(showError);

    const deletePackage = useDeletePackage(showSuccess, showError);

    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [packageToDelete, setPackageToDelete] = useState<Package | null>(
        null
    );
    const [confirmDeleteEntityName, setConfirmDeleteEntityName] = useState("");

    const editorDialogState = useEditorDialogState<Package>(null);

    const handleDeleteButtonClick = (partPackage: Package) => {
        setPackageToDelete(partPackage);
        setConfirmDeleteEntityName(partPackage.name);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDeleteDialogClose = (confirmed: boolean) => {
        if (confirmed && packageToDelete) {
            deletePackage.mutate(packageToDelete._id);
        }

        setPackageToDelete(null);
        setDeleteDialogOpen(false);
    };

    const handleCreateButtonClick = () => {
        editorDialogState.openDialog();
    };

    const handleEditButtonClick = (partPackage: Package) => {
        editorDialogState.openDialog(partPackage);
    };

    const handleEditorDialogClose = () => {
        editorDialogState.closeDialog();
    };

    return (
        <>
            <CreateButton
                entityType={ENTITY_TYPE_PACKAGE}
                onClick={handleCreateButtonClick}
            />
            {/* <PackageEditorDialog
                onClose={handleEditorDialogClose}
                isOpen={editorDialogState.isDialogOpen}
                initialEntity={editorDialogState.selectedEntity}
            /> */}
            <ConfirmDeleteDialog
                handleClose={handleConfirmDeleteDialogClose}
                isOpen={isDeleteDialogOpen}
                entityType={ENTITY_TYPE_PACKAGE}
                entityName={confirmDeleteEntityName}
            />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Package</TableCell>
                            <TableCell>Package type</TableCell>
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
                        {packages?.map((partPackage) => (
                            <TableRow key={partPackage._id}>
                                <TableCell align="left">
                                    {partPackage.name}
                                </TableCell>
                                <TableCell align="left">
                                    {partPackage.type}
                                </TableCell>
                                <TableCell align="right">
                                    <EntityActionButtons
                                        onEditButtonClick={() =>
                                            handleEditButtonClick(partPackage)
                                        }
                                        onDeleteButtonClick={() =>
                                            handleDeleteButtonClick(partPackage)
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

export default PackageTable;
