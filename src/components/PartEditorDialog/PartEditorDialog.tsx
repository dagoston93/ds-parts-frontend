import LoadingButton from "@mui/lab/LoadingButton";
import { InputAdornment } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdAdd, MdSave } from "react-icons/md";
import { joiResolver } from "@hookform/resolvers/joi";

import useCategories from "../../hooks/useCategories";
import useManufacturers from "../../hooks/useManufacturers";
import usePackages from "../../hooks/usePackages";
import {
    Part,
    PartFormData,
    partToPartFormData,
} from "../../services/partService";

import validationSchema from "./validationSchema";
import useAddPart from "../../hooks/parts/useAddPart";
import useUpdatePart from "../../hooks/parts/useUpdatePart";
import useNotifications from "../../hooks/useNotifications";
import DropdownInput from "../EditorDialog/DropdownInput";
import CloseButton from "../EditorDialog/CloseButton";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    initialPart?: Part | null;
}

const PartEditorDialog = ({ isOpen, onClose, initialPart }: Props) => {
    const { showSuccess, showError } = useNotifications();

    const addPart = useAddPart(showSuccess, showError);
    const updatePart = useUpdatePart(showSuccess, showError);

    const { data: manufacturers } = useManufacturers(() => {});
    const { data: categories } = useCategories(() => {});
    const { data: packages } = usePackages(() => {});

    const [isLoading, setLoading] = useState(false);

    const { handleSubmit, register, reset, formState } = useForm<PartFormData>({
        resolver: joiResolver(validationSchema),
        mode: "onChange",
    });
    const { errors, isValid, touchedFields } = formState;

    const resetForm = () => {
        reset({
            category: "",
            name: "",
            manufacturer: "",
            partPackage: "",
            price: null,
            count: null,
        });
    };

    const handleClose = () => {
        setLoading(false);
        resetForm();
        onClose();
    };

    const isEditing = !!initialPart;
    const initialData =
        isEditing && initialPart ? partToPartFormData(initialPart) : null;

    useEffect(() => {
        if (isEditing && initialData) {
            reset(initialData);
        }
    }, [initialPart, reset]);

    const onSubmit = (data: PartFormData) => {
        setLoading(true);
        if (!isEditing) {
            addPart.mutate(data, {
                onSettled: handleClose,
            });
        } else {
            updatePart.mutate(
                {
                    partFormData: data,
                    id: initialPart!._id,
                },
                {
                    onSettled: handleClose,
                }
            );
        }
    };

    return (
        <Dialog
            open={isOpen}
            PaperProps={{
                component: "form",
                onSubmit: handleSubmit(onSubmit),
            }}
        >
            <DialogTitle>{isEditing ? "Edit " : "Create "}part</DialogTitle>
            <CloseButton onClick={handleClose} />
            <DialogContent>
                <DropdownInput
                    {...register("category")}
                    id="category"
                    label="Category"
                    options={categories}
                    defaultValue={initialData?.category}
                    error={!!errors.category}
                    touched={!!touchedFields.category}
                    helperText={errors.category?.message}
                />
                <TextField
                    {...register("name")}
                    id="name"
                    name="name"
                    label="Part name"
                    required
                    fullWidth
                    type="text"
                    variant="outlined"
                    margin="normal"
                    defaultValue={initialData?.name || ""}
                    error={!!errors.name && touchedFields.name}
                    helperText={touchedFields.name ? errors.name?.message : ""}
                />
                <DropdownInput
                    {...register("manufacturer")}
                    id="manufacturer"
                    label="Manufacturer"
                    options={manufacturers}
                    defaultValue={initialData?.manufacturer}
                    error={!!errors.manufacturer}
                    touched={!!touchedFields.manufacturer}
                    helperText={errors.manufacturer?.message}
                />
                <DropdownInput
                    {...register("partPackage")}
                    id="partPackage"
                    label="Package"
                    options={packages}
                    defaultValue={initialData?.partPackage}
                    error={!!errors.partPackage}
                    touched={!!touchedFields.partPackage}
                    helperText={errors.partPackage?.message}
                />
                <TextField
                    {...register("price", { valueAsNumber: true })}
                    id="price"
                    name="price"
                    label="Price"
                    required
                    fullWidth
                    type="number"
                    variant="outlined"
                    margin="normal"
                    defaultValue={initialData?.price || ""}
                    error={!!errors.price && touchedFields.price}
                    helperText={
                        touchedFields.price ? errors.price?.message : ""
                    }
                    slotProps={{
                        htmlInput: {
                            step: 0.01,
                            min: 0.01,
                        },
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    $
                                </InputAdornment>
                            ),
                        },
                    }}
                />
                <TextField
                    {...register("count", { valueAsNumber: true })}
                    id="count"
                    name="count"
                    label="Count"
                    required
                    fullWidth
                    type="number"
                    variant="outlined"
                    margin="normal"
                    defaultValue={initialData?.count || ""}
                    error={!!errors.count && touchedFields.count}
                    helperText={
                        touchedFields.count ? errors.count?.message : ""
                    }
                    slotProps={{
                        htmlInput: {
                            step: 1,
                            min: 0,
                        },
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => handleClose()}
                    variant="outlined"
                    disabled={isLoading}
                >
                    Cancel
                </Button>
                <LoadingButton
                    type="submit"
                    variant="contained"
                    startIcon={isEditing ? <MdSave /> : <MdAdd />}
                    loading={isLoading}
                    disabled={!isValid}
                >
                    {isEditing ? "Save" : "Create"}
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
};

export default PartEditorDialog;
