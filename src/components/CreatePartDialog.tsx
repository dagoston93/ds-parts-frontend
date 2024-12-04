import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton, InputAdornment, MenuItem } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { MdAdd, MdClose } from "react-icons/md";
import useManufacturers from "../hooks/useManufacturers";
import useCategories from "../hooks/useCategories";
import usePackages from "../hooks/usePackages";
import { useForm } from "react-hook-form";
import { PartData } from "../services/partService";
import { useEffect } from "react";

interface Props {
    isOpen: boolean;
    handleClose: (data: PartData | null) => void;
    isLoading: boolean;
    initialData?: PartData | null;
}

const CreatePartDialog = ({
    isOpen,
    handleClose,
    isLoading,
    initialData,
}: Props) => {
    const { manufacturers } = useManufacturers(() => {});
    const { categories } = useCategories(() => {});
    const { packages } = usePackages(() => {});
    const { handleSubmit, register, reset } = useForm<PartData>();

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

    useEffect(() => {
        if (initialData) {
            reset(initialData);
        } else {
            resetForm();
        }
    }, [initialData, reset]);

    const onSubmit = (data: PartData) => {
        resetForm();
        handleClose(data);
    };

    return (
        <Dialog
            open={isOpen}
            PaperProps={{
                component: "form",
                onSubmit: handleSubmit(onSubmit),
            }}
        >
            <DialogTitle>{initialData ? "Edit " : "Create "}part</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={() => handleClose(null)}
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
                    select
                    label="Category"
                    fullWidth
                    defaultValue={initialData?.category || ""}
                >
                    {categories.map((category) => (
                        <MenuItem key={category._id} value={category._id}>
                            {category.name}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    {...register("name")}
                    autoFocus
                    required
                    margin="normal"
                    id="name"
                    name="name"
                    label="Part name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    defaultValue={initialData?.name || ""}
                />
                <TextField
                    {...register("manufacturer")}
                    margin="normal"
                    id="manufacturer"
                    select
                    label="Manufacturer"
                    fullWidth
                    defaultValue={initialData?.manufacturer || ""}
                >
                    {manufacturers.map((manufacturer) => (
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
                    margin="normal"
                    id="partPackage"
                    select
                    label="Package"
                    fullWidth
                    defaultValue={initialData?.partPackage || ""}
                >
                    {packages.map((p) => (
                        <MenuItem key={p._id} value={p._id}>
                            {p.name}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    {...register("price", { valueAsNumber: true })}
                    autoFocus
                    required
                    margin="normal"
                    id="price"
                    name="price"
                    label="Price"
                    type="number"
                    fullWidth
                    variant="outlined"
                    defaultValue={initialData?.price || ""}
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
                    autoFocus
                    required
                    margin="normal"
                    id="count"
                    name="count"
                    label="Count"
                    type="number"
                    fullWidth
                    variant="outlined"
                    defaultValue={initialData?.count || ""}
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
                    onClick={() => handleClose(null)}
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
                >
                    {initialData ? "Save" : "Create"}
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
};

export default CreatePartDialog;
