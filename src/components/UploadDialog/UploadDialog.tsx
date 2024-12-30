import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import TextInput from "../EditorDialog/TextInput";
import { useSession } from "../../auth/useSession";
import { useForm } from "react-hook-form";
import uploadService, {
    FileUploadFormData,
} from "../../services/uploadService";
import { joiResolver } from "@hookform/resolvers/joi";
import validationSchema from "./validationSchema";
import { useState } from "react";
import useNotifications from "../../hooks/useNotifications";
import CloseButton from "../EditorDialog/CloseButton";
import LoadingButton from "@mui/lab/LoadingButton";
import { FaFileUpload } from "react-icons/fa";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    type: "Image" | "File";
}

const UploadDialog = ({ isOpen, onClose, type }: Props) => {
    const { session } = useSession();

    if (!session?.user?.rights.canModifyParts) {
        return null;
    }

    const { handleSubmit, register, reset, formState } =
        useForm<FileUploadFormData>({
            resolver: joiResolver(validationSchema),
            mode: "onChange",
        });
    const { errors, isValid, touchedFields } = formState;

    const [isLoading, setLoading] = useState(false);
    const { showSuccess, showError } = useNotifications();

    const resetForm = () => {
        reset({
            name: "",
            description: "",
        });
    };

    const handleClose = () => {
        setLoading(false);
        resetForm();
        onClose();
    };

    const onSubmit = async (data: FileUploadFormData) => {
        setLoading(true);

        const res =
            type == "Image"
                ? uploadService.uploadImage(data)
                : uploadService.uploadFile(data);

        res.then(() => {
            showSuccess("Image uploaded.");
            handleClose();
        }).catch((err) => {
            setLoading(false);
            showError(err.message);
        });
    };

    return (
        <Dialog
            open={isOpen}
            PaperProps={{
                component: "form",
                onSubmit: handleSubmit(onSubmit),
                encType: "multipart/form-data",
            }}
        >
            <DialogTitle>{`Upload ${type}`}</DialogTitle>
            <CloseButton onClick={onClose} />
            <DialogContent>
                <input {...register("file")} type="file" name="file" />
                <TextInput
                    register={register}
                    id="name"
                    label="Name"
                    defaultValue=""
                    error={!!errors.name}
                    touched={!!touchedFields.name}
                    helperText={errors.name?.message}
                />
                <TextInput
                    register={register}
                    id="description"
                    label="Description"
                    defaultValue=""
                    error={!!errors.description}
                    touched={!!touchedFields.description}
                    helperText={errors.description?.message}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => onClose()}
                    variant="outlined"
                    disabled={isLoading}
                >
                    Cancel
                </Button>
                <LoadingButton
                    type="submit"
                    variant="contained"
                    startIcon={<FaFileUpload />}
                    loading={isLoading}
                    disabled={!isValid}
                >
                    Upload
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
};

export default UploadDialog;
