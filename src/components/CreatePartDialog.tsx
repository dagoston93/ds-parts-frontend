import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton, InputAdornment, MenuItem } from "@mui/material";
import { MdClose } from "react-icons/md";
import useManufacturers from "../hooks/useManufacturers";
import useCategories from "../hooks/useCategories";
import usePackages from "../hooks/usePackages";

interface Props {
    isOpen: boolean;
    handleClose: () => void;
}

const CreatePartDialog = ({ isOpen, handleClose }: Props) => {
    const { manufacturers } = useManufacturers(() => {});
    const { categories } = useCategories(() => {});
    const { packages } = usePackages(() => {});

    return (
        <>
            <Dialog
                open={isOpen}
                PaperProps={{
                    component: "form",
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(
                            (formData as any).entries()
                        );
                        const email = formJson.email;
                        console.log(email);
                        handleClose();
                    },
                }}
            >
                <DialogTitle>Create part</DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
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
                        id="category"
                        select
                        label="Category"
                        fullWidth
                        defaultValue=""
                    >
                        {categories.map((category) => (
                            <MenuItem key={category._id} value={category.name}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        autoFocus
                        required
                        margin="normal"
                        id="name"
                        name="name"
                        label="Part name"
                        type="text"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        margin="normal"
                        id="manufacturer"
                        select
                        label="Manufacturer"
                        fullWidth
                        defaultValue=""
                    >
                        {manufacturers.map((manufacturer) => (
                            <MenuItem
                                key={manufacturer._id}
                                value={manufacturer.name}
                            >
                                {manufacturer.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        margin="normal"
                        id="package"
                        select
                        label="Package"
                        fullWidth
                        defaultValue=""
                    >
                        {packages.map((p) => (
                            <MenuItem key={p._id} value={p.name}>
                                {p.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        autoFocus
                        required
                        margin="normal"
                        id="name"
                        name="name"
                        label="Price"
                        type="number"
                        fullWidth
                        variant="outlined"
                        slotProps={{
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
                        autoFocus
                        required
                        margin="normal"
                        id="name"
                        name="name"
                        label="Count"
                        type="number"
                        fullWidth
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined">
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CreatePartDialog;
