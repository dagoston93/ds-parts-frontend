import { Button, CircularProgress, IconButton } from "@mui/material";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { AxiosResponse } from "axios";
import { useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";

import useNotifications from "../hooks/useNotifications";
import useParts from "../hooks/useParts";
import {
    Part,
    PartFormData,
    partToPartFormData,
} from "../services/partService";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import { CreatePartDialog } from "./CreatePartDialog";
import useAddPart from "../hooks/useAddPart";
import useDeletePart from "../hooks/useDeletePart";
import useUpdatePart from "../hooks/useUpdatePart";
import useIncrementPartCount from "../hooks/useIncrementPartCount";
import useDecrementPartCount from "../hooks/useDecrementPartCount";

const PartTable = () => {
    const { showSuccess, showError } = useNotifications();
    const { data: parts, isLoading } = useParts(showError);
    const addPart = useAddPart(showSuccess, showError);
    const deletePart = useDeletePart(showSuccess, showError);
    const updatePart = useUpdatePart(showSuccess, showError);
    const incrementPartCount = useIncrementPartCount(showError);
    const decrementPartCount = useDecrementPartCount(showError);
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [isCreatePartDialogOpen, setCreatePartDialogOpen] = useState(false);
    const [selectedPart, setSelectedPart] = useState<Part | null>(null);
    const [isDialogLoading, setDialogLoading] = useState(false);
    const [partFormData, setPartFormData] = useState<PartFormData | null>(null);
    const [confirmDeleteEntityName, setConfirmDeleteEntityName] = useState("");
    const [confirmDeleteEntityType, setConfirmDeleteEntityType] = useState("");

    const handleDeletePartButtonClick = (part: Part) => {
        setSelectedPart(part);
        setConfirmDeleteEntityName(part.name);
        setConfirmDeleteEntityType("part");
        setDeleteDialogOpen(true);
    };

    const handleDeletePartDialogClose = (confirmed: boolean) => {
        if (confirmed && selectedPart) {
            deletePart.mutate(selectedPart._id);
        }

        setSelectedPart(null);
        setDeleteDialogOpen(false);
    };

    const handleCreatePartButtonClick = () => {
        setPartFormData(null);
        setCreatePartDialogOpen(true);
    };

    const handleEditPartButtonClick = (part: Part) => {
        setSelectedPart(part);
        setPartFormData(partToPartFormData(part));
        setCreatePartDialogOpen(true);
    };

    const closeCreatePartDialog = () => {
        setCreatePartDialogOpen(false);
        setDialogLoading(false);
        setSelectedPart(null);
    };

    const handleCreatePartDialogClose = (
        data: PartFormData | null,
        callback?: () => void
    ) => {
        if (data) {
            setDialogLoading(true);

            let isEditing = !!selectedPart;

            if (!isEditing) {
                addPart.mutate(data);
                closeCreatePartDialog();
                callback?.();
            } else {
                updatePart.mutate({
                    partFormData: data,
                    id: selectedPart!._id,
                });
                closeCreatePartDialog();
                callback?.();
            }
        } else {
            closeCreatePartDialog();
            callback?.();
        }
    };

    const handleIncrementPartCountButtonClick = (part: Part) => {
        incrementPartCount.mutate(part._id);
    };

    const handleDecrementPartCountButtonClick = (part: Part) => {
        decrementPartCount.mutate(part._id);
    };

    return (
        <>
            <Button
                variant="contained"
                startIcon={<MdAdd />}
                onClick={handleCreatePartButtonClick}
            >
                Create part
            </Button>
            <CreatePartDialog
                handleClose={handleCreatePartDialogClose}
                isOpen={isCreatePartDialogOpen}
                isLoading={isDialogLoading}
                initialData={partFormData}
            />
            <ConfirmDeleteDialog
                handleClose={handleDeletePartDialogClose}
                isOpen={isDeleteDialogOpen}
                entityType={confirmDeleteEntityType}
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
                                    <Stack spacing={-1}>
                                        <IconButton
                                            color="primary"
                                            sx={{ paddingBottom: 0 }}
                                            onClick={() => {
                                                handleIncrementPartCountButtonClick(
                                                    part
                                                );
                                            }}
                                        >
                                            <FaCaretUp />
                                        </IconButton>
                                        <IconButton
                                            color="primary"
                                            sx={{ paddingTop: 0 }}
                                            onClick={() => {
                                                handleDecrementPartCountButtonClick(
                                                    part
                                                );
                                            }}
                                        >
                                            <FaCaretDown />
                                        </IconButton>
                                    </Stack>
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        color="primary"
                                        onClick={() =>
                                            handleEditPartButtonClick(part)
                                        }
                                    >
                                        <MdEdit />
                                    </IconButton>
                                    <IconButton
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
