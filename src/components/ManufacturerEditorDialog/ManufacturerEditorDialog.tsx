import { Dialog, DialogContent } from "@mui/material";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

import useAddManufacturer from "../../hooks/manufacturers/useAddManufacturer";
import useUpdateManufacturer from "../../hooks/manufacturers/useUpdateManufacturer";
import useNotifications from "../../hooks/useNotifications";
import {
    Manufacturer,
    ManufacturerFormData,
    manufacturerToManufacturerFormData,
} from "../../services/manufacturerService";

import validationSchema from "./validationSchema";
import EditorDialogTitle from "../EditorDialog/EditorDialogTitle";
import CloseButton from "../EditorDialog/CloseButton";
import TextInput from "../EditorDialog/TextInput";
import EditorDialogActions from "../EditorDialog/EditorDialogActions";
import { ENTITY_TYPE_MANUFACTURER } from "../../common/entity";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    initialManufacturer?: Manufacturer | null;
}

const ManufacturerEditorDialog = ({
    isOpen,
    onClose,
    initialManufacturer,
}: Props) => {
    const { showSuccess, showError } = useNotifications();

    const addManufacturer = useAddManufacturer(showSuccess, showError);
    const updateManufacturer = useUpdateManufacturer(showSuccess, showError);

    const [isLoading, setLoading] = useState(false);

    const { handleSubmit, register, reset, formState } =
        useForm<ManufacturerFormData>({
            resolver: joiResolver(validationSchema),
            mode: "onChange",
        });
    const { errors, isValid, touchedFields } = formState;

    const resetForm = () => {
        reset({
            name: "",
        });
    };

    const handleClose = () => {
        setLoading(false);
        resetForm();
        onClose();
    };

    const isEditing = !!initialManufacturer;
    const initialData =
        isEditing && initialManufacturer
            ? manufacturerToManufacturerFormData(initialManufacturer)
            : null;

    useEffect(() => {
        if (isEditing && initialData) {
            reset(initialData);
        }
    }, [initialManufacturer, reset]);

    const onSubmit = async (data: ManufacturerFormData) => {
        setLoading(true);

        const mutation = isEditing
            ? updateManufacturer.mutateAsync({
                  formData: data,
                  id: initialManufacturer!._id,
              })
            : addManufacturer.mutateAsync(data);

        mutation
            .then(() => {
                handleClose();
            })
            .catch((err) => {
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
            }}
        >
            <EditorDialogTitle
                isEditing={isEditing}
                entityType={ENTITY_TYPE_MANUFACTURER}
            />
            <CloseButton onClick={handleClose} />
            <DialogContent>
                <TextInput
                    register={register}
                    id="name"
                    label="Manufacturer name"
                    defaultValue={initialData?.name}
                    error={!!errors.name}
                    touched={!!touchedFields.name}
                    helperText={errors.name?.message}
                />
            </DialogContent>
            <EditorDialogActions
                isEditing={isEditing}
                isLoading={isLoading}
                isValid={isValid}
                onClose={handleClose}
            />
        </Dialog>
    );
};

export default ManufacturerEditorDialog;
