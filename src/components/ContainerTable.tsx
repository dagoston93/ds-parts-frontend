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
import { Container } from "../services/containerService";
import useContainers from "../hooks/containers/useContainers";
import useDeleteContainer from "../hooks/containers/useDeleteContainer";
import { ContainerEditorDialog } from "./ContainerEditorDialog";
import { ENTITY_TYPE_CONTAINER } from "../common/entity";
import EntityActionHeader from "./EntityTable/EntityActionHeader";

const ContainerTable = () => {
    const { showSuccess, showError } = useNotifications();
    const { data: containers, isLoading } = useContainers(showError);

    const deleteContainer = useDeleteContainer(showSuccess, showError);

    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [containerToDelete, setContainerToDelete] =
        useState<Container | null>(null);
    const [confirmDeleteEntityName, setConfirmDeleteEntityName] = useState("");

    const editorDialogState = useEditorDialogState<Container>(null);

    const handleDeleteButtonClick = (container: Container) => {
        setContainerToDelete(container);
        setConfirmDeleteEntityName(container.name);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDeleteDialogClose = (confirmed: boolean) => {
        if (confirmed && containerToDelete) {
            deleteContainer.mutate(containerToDelete._id);
        }

        setContainerToDelete(null);
        setDeleteDialogOpen(false);
    };

    const handleCreateButtonClick = () => {
        editorDialogState.openDialog();
    };

    const handleEditButtonClick = (container: Container) => {
        editorDialogState.openDialog(container);
    };

    const handleEditorDialogClose = () => {
        editorDialogState.closeDialog();
    };

    return (
        <>
            <CreateButton
                entityType={ENTITY_TYPE_CONTAINER}
                onClick={handleCreateButtonClick}
            />
            <ContainerEditorDialog
                onClose={handleEditorDialogClose}
                isOpen={editorDialogState.isDialogOpen}
                initialEntity={editorDialogState.selectedEntity}
            />
            <ConfirmDeleteDialog
                handleClose={handleConfirmDeleteDialogClose}
                isOpen={isDeleteDialogOpen}
                entityType={ENTITY_TYPE_CONTAINER}
                entityName={confirmDeleteEntityName}
            />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Container</TableCell>
                            <EntityActionHeader />
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
                        {containers?.map((container) => (
                            <TableRow key={container._id}>
                                <TableCell align="left">
                                    {container.name}
                                </TableCell>
                                <EntityActionButtons
                                    onEditButtonClick={() =>
                                        handleEditButtonClick(container)
                                    }
                                    onDeleteButtonClick={() =>
                                        handleDeleteButtonClick(container)
                                    }
                                />
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default ContainerTable;
