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
import TextInput from "../EditorDialog/TextInput";
import { ENTITY_TYPE_MANUFACTURER } from "../../common/entity";
import EditorDialog, { EditorDialogProps } from "../EditorDialog/EditorDialog";

const ManufacturerEditorDialog = ({
    isOpen,
    onClose,
    initialEntity,
}: EditorDialogProps<Manufacturer>) => {
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

    const isEditing = !!initialEntity;
    const initialData =
        isEditing && initialEntity
            ? manufacturerToManufacturerFormData(initialEntity)
            : null;

    useEffect(() => {
        if (isEditing && initialData) {
            reset(initialData);
        }
    }, [initialEntity, reset]);

    const onSubmit = async (data: ManufacturerFormData) => {
        setLoading(true);

        const mutation = isEditing
            ? updateManufacturer.mutateAsync({
                  formData: data,
                  id: initialEntity!._id,
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
        <EditorDialog
            isOpen={isOpen}
            isEditing={isEditing}
            isLoading={isLoading}
            isValid={isValid}
            entityType={ENTITY_TYPE_MANUFACTURER}
            onClose={handleClose}
            onSubmit={handleSubmit(onSubmit)}
        >
            <TextInput
                register={register}
                id="name"
                label="Manufacturer name"
                defaultValue={initialData?.name}
                error={!!errors.name}
                touched={!!touchedFields.name}
                helperText={errors.name?.message}
            />
        </EditorDialog>
    );
};

export default ManufacturerEditorDialog;
