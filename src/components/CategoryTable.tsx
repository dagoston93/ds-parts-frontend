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
import { Category } from "../services/categoryService";
import useCategories from "../hooks/categories/useCategories";
import useDeleteCategory from "../hooks/categories/useDeleteCategory";
import { CategoryEditorDialog } from "./CategoryEditorDialog";
import { ENTITY_TYPE_CATEGORY } from "../common/entity";

const CategoryTable = () => {
    const { showSuccess, showError } = useNotifications();
    const { data: categories, isLoading } = useCategories(showError);

    const deleteCategory = useDeleteCategory(showSuccess, showError);

    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
        null
    );
    const [confirmDeleteEntityName, setConfirmDeleteEntityName] = useState("");

    const editorDialogState = useEditorDialogState<Category>(null);

    const handleDeleteButtonClick = (category: Category) => {
        setCategoryToDelete(category);
        setConfirmDeleteEntityName(category.name);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDeleteDialogClose = (confirmed: boolean) => {
        if (confirmed && categoryToDelete) {
            deleteCategory.mutate(categoryToDelete._id);
        }

        setCategoryToDelete(null);
        setDeleteDialogOpen(false);
    };

    const handleCreateButtonClick = () => {
        editorDialogState.openDialog();
    };

    const handleEditButtonClick = (category: Category) => {
        editorDialogState.openDialog(category);
    };

    const handleEditorDialogClose = () => {
        editorDialogState.closeDialog();
    };

    return (
        <>
            <CreateButton
                entityType={ENTITY_TYPE_CATEGORY}
                onClick={handleCreateButtonClick}
            />
            <CategoryEditorDialog
                onClose={handleEditorDialogClose}
                isOpen={editorDialogState.isDialogOpen}
                initialEntity={editorDialogState.selectedEntity}
            />
            <ConfirmDeleteDialog
                handleClose={handleConfirmDeleteDialogClose}
                isOpen={isDeleteDialogOpen}
                entityType={ENTITY_TYPE_CATEGORY}
                entityName={confirmDeleteEntityName}
            />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Category</TableCell>
                            <TableCell>Parent</TableCell>
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
                        {categories?.map((category) => (
                            <TableRow key={category._id}>
                                <TableCell align="left">
                                    {category.name}
                                </TableCell>
                                <TableCell>
                                    {category.parent?.name || "-"}
                                </TableCell>
                                <TableCell align="right">
                                    <EntityActionButtons
                                        onEditButtonClick={() =>
                                            handleEditButtonClick(category)
                                        }
                                        onDeleteButtonClick={() =>
                                            handleDeleteButtonClick(category)
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

export default CategoryTable;
