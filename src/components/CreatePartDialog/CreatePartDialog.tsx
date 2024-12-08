import LoadingButton from "@mui/lab/LoadingButton";
import { IconButton, InputAdornment, MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { MdAdd, MdClose } from "react-icons/md";
import { joiResolver } from "@hookform/resolvers/joi";

import useCategories from "../../hooks/useCategories";
import useManufacturers from "../../hooks/useManufacturers";
import usePackages from "../../hooks/usePackages";
import { PartFormData } from "../../services/partService";

import validationSchema from "./validationSchema";

interface Props {
    isOpen: boolean;
    handleClose: (data: PartFormData | null, callback?: () => void) => void;
    isLoading: boolean;
    initialData?: PartFormData | null;
}

const CreatePartDialog = ({
    isOpen,
    handleClose,
    isLoading,
    initialData,
}: Props) => {
    const { data: manufacturers } = useManufacturers(() => {});
    const { data: categories } = useCategories(() => {});
    const { data: packages } = usePackages(() => {});
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

    const isEditing = !!initialData;

    useEffect(() => {
        if (isEditing) {
            reset(initialData);
        } else {
            resetForm();
        }
    }, [initialData, reset]);

    const onSubmit = (data: PartFormData) => {
        handleClose(data, resetForm);
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
            <IconButton
                onClick={() => handleClose(null, resetForm)}
                sx={(theme) => ({
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: theme.palette.grey[500],
                })}
            >
                <MdClose />
            </IconButton>
            <DialogContent>
                <TextField
                    {...register("category")}
                    id="category"
                    name="category"
                    label="Category"
                    required
                    fullWidth
                    select
                    margin="normal"
                    defaultValue={initialData?.category || ""}
                    error={!!errors.category && touchedFields.category}
                    helperText={
                        touchedFields.category ? errors.category?.message : ""
                    }
                >
                    {categories?.map((category) => (
                        <MenuItem key={category._id} value={category._id}>
                            {category.name}
                        </MenuItem>
                    ))}
                </TextField>
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
                <TextField
                    {...register("manufacturer")}
                    id="manufacturer"
                    name="manufacturer"
                    label="Manufacturer"
                    required
                    fullWidth
                    select
                    margin="normal"
                    defaultValue={initialData?.manufacturer || ""}
                    error={!!errors.manufacturer && touchedFields.manufacturer}
                    helperText={
                        touchedFields.manufacturer
                            ? errors.manufacturer?.message
                            : ""
                    }
                >
                    {manufacturers?.map((manufacturer) => (
                        <MenuItem
                            key={manufacturer._id}
                            value={manufacturer._id}
                        >
                            {manufacturer.name}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    {...register("partPackage")}
                    id="partPackage"
                    name="partPackage"
                    label="Package"
                    required
                    fullWidth
                    select
                    margin="normal"
                    defaultValue={initialData?.partPackage || ""}
                    error={!!errors.partPackage && touchedFields.partPackage}
                    helperText={
                        touchedFields.partPackage
                            ? errors.partPackage?.message
                            : ""
                    }
                >
                    {packages?.map((p) => (
                        <MenuItem key={p._id} value={p._id}>
                            {p.name}
                        </MenuItem>
                    ))}
                </TextField>
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
                    onClick={() => handleClose(null, resetForm)}
                    variant="outlined"
                    disabled={isLoading}
                >
                    Cancel
                </Button>
                <LoadingButton
                    type="submit"
                    variant="contained"
                    startIcon={<MdAdd />}
                    loading={isLoading}
                    disabled={!isValid}
                >
                    {isEditing ? "Save" : "Create"}
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
};

export default CreatePartDialog;
