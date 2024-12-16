import { UseMutationResult } from "@tanstack/react-query";
import { UpdateEntityData } from "../../hooks/entities/useUpdateEntity";
import useNotifications from "../../hooks/useNotifications";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { Entity } from "../../common/entity";

interface Props<TEntity extends Entity, TFormData extends FieldValues> {
    initialEntity: TEntity | null | undefined;
    defaultFormValues: TFormData;
    validationSchema: Joi.ObjectSchema<any>;
    entityToFormData: (entity: TEntity) => TFormData;
    onClose: () => void;
    addMutationFn: (
        onSuccess: (message: string) => void,
        onError: (message: string) => void
    ) => UseMutationResult<TEntity, Error, TFormData>;
    updateMutationFn: (
        onSuccess: (message: string) => void,
        onError: (message: string) => void
    ) => UseMutationResult<TEntity, Error, UpdateEntityData<TFormData>>;
    processFormData?: (data: TFormData) => TFormData;
}

const useEditorDialog = <
    TEntity extends Entity,
    TFormData extends FieldValues,
>({
    initialEntity,
    defaultFormValues,
    validationSchema,
    entityToFormData,
    onClose,
    addMutationFn,
    updateMutationFn,
    processFormData,
}: Props<TEntity, TFormData>) => {
    const { showSuccess, showError } = useNotifications();

    const addMutation = addMutationFn(showSuccess, showError);
    const updateMutation = updateMutationFn(showSuccess, showError);

    const [isLoading, setLoading] = useState(false);

    const { handleSubmit, register, reset, formState } = useForm<TFormData>({
        resolver: joiResolver(validationSchema),
        mode: "onChange",
    });
    const { errors, isValid, touchedFields } = formState;

    const resetForm = () => {
        reset(defaultFormValues);
    };

    const handleClose = () => {
        setLoading(false);
        resetForm();
        onClose();
    };

    const isEditing = !!initialEntity;
    const initialData =
        isEditing && initialEntity ? entityToFormData(initialEntity) : null;

    useEffect(() => {
        if (isEditing && initialData) {
            reset(initialData);
        }
    }, [initialEntity, reset]);

    const onSubmit = async (data: TFormData) => {
        setLoading(true);

        const processedData = !!processFormData ? processFormData(data) : data;

        const mutation = isEditing
            ? updateMutation.mutateAsync({
                  formData: processedData,
                  id: initialEntity!._id,
              })
            : addMutation.mutateAsync(processedData);

        mutation
            .then(() => {
                handleClose();
            })
            .catch((err) => {
                setLoading(false);
                showError(err.message);
            });
    };

    return {
        isEditing,
        isLoading,
        isValid,
        initialData,
        errors,
        touchedFields,
        handleSubmit,
        register,
        handleClose,
        onSubmit,
    };
};

export default useEditorDialog;
