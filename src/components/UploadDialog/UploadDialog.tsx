import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from "@mui/material";
import TextInput from "../EditorDialog/TextInput";
import { useSession } from "../../auth/useSession";
import { useForm } from "react-hook-form";
import fileService, {
    File,
    FileUploadFormData,
} from "../../services/fileService";
import { joiResolver } from "@hookform/resolvers/joi";
import validationSchema from "./validationSchema";
import { useRef, useState } from "react";
import useNotifications from "../../hooks/useNotifications";
import CloseButton from "../EditorDialog/CloseButton";
import LoadingButton from "@mui/lab/LoadingButton";
import { FaFileUpload } from "react-icons/fa";
import HiddenInput from "./HiddenInput";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
    isOpen: boolean;
    onClose: (file?: File | null) => void;
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

    const { showSuccess, showError } = useNotifications();

    const [isLoading, setLoading] = useState(false);
    const [selectedFileName, setSelectedFileName] = useState("");
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const queryClient = useQueryClient();

    const resetForm = () => {
        reset({
            name: "",
            description: "",
        });

        setSelectedFileName("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleClose = (file?: File | null) => {
        setLoading(false);
        resetForm();
        onClose(file);
    };

    const onSubmit = async (data: FileUploadFormData) => {
        setLoading(true);

        const res =
            type == "Image"
                ? fileService.uploadImage(data)
                : fileService.uploadFile(data);

        res.then((file) => {
            const queryKey = type == "Image" ? "images" : "files";
            queryClient.setQueryData<File[]>([queryKey], (files) => [
                ...(files || []),
                file,
            ]);

            handleClose(file);
            showSuccess(`${type} uploaded.`);
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
            <CloseButton onClick={() => handleClose()} />
            <DialogContent>
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<FaFileUpload />}
                >
                    {`Select ${type}`}
                    <HiddenInput
                        {...register("file")}
                        ref={(e) => {
                            register("file").ref(e);
                            fileInputRef.current = e;
                        }}
                        type="file"
                        name="file"
                        accept={type === "Image" ? "image/*" : "*"}
                        onChange={(event) =>
                            setSelectedFileName(
                                event.target.files?.[0].name || ""
                            )
                        }
                    />
                </Button>
                <Typography variant="caption" sx={{ ml: 2 }}>
                    {selectedFileName}
                </Typography>
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
                    onClick={() => handleClose()}
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
                    disabled={!isValid || selectedFileName == ""}
                >
                    Upload
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
};

export default UploadDialog;
