import { InputAdornment } from "@mui/material";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

import useCategories from "../../hooks/useCategories";
import useManufacturers from "../../hooks/manufacturers/useManufacturers";
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
import TextInput from "../EditorDialog/TextInput";
import NumericInput from "../EditorDialog/NumericInput";
import { ENTITY_TYPE_PART } from "../../common/entity";
import EditorDialog, { EditorDialogProps } from "../EditorDialog/EditorDialog";

const PartEditorDialog = ({
    isOpen,
    onClose,
    initialEntity,
}: EditorDialogProps<Part>) => {
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

    const isEditing = !!initialEntity;
    const initialData =
        isEditing && initialEntity ? partToPartFormData(initialEntity) : null;

    useEffect(() => {
        if (isEditing && initialData) {
            reset(initialData);
        }
    }, [initialEntity, reset]);

    const onSubmit = async (data: PartFormData) => {
        setLoading(true);

        const mutation = isEditing
            ? updatePart.mutateAsync({
                  formData: data,
                  id: initialEntity!._id,
              })
            : addPart.mutateAsync(data);

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
            entityType={ENTITY_TYPE_PART}
            onClose={handleClose}
            onSubmit={handleSubmit(onSubmit)}
        >
            <DropdownInput
                register={register}
                id="category"
                label="Category"
                options={categories}
                defaultValue={initialData?.category}
                error={!!errors.category}
                touched={!!touchedFields.category}
                helperText={errors.category?.message}
            />
            <TextInput
                register={register}
                id="name"
                label="Part name"
                defaultValue={initialData?.name}
                error={!!errors.name}
                touched={!!touchedFields.name}
                helperText={errors.name?.message}
            />
            <DropdownInput
                register={register}
                id="manufacturer"
                label="Manufacturer"
                options={manufacturers}
                defaultValue={initialData?.manufacturer}
                error={!!errors.manufacturer}
                touched={!!touchedFields.manufacturer}
                helperText={errors.manufacturer?.message}
            />
            <DropdownInput
                register={register}
                id="partPackage"
                label="Package"
                options={packages}
                defaultValue={initialData?.partPackage}
                error={!!errors.partPackage}
                touched={!!touchedFields.partPackage}
                helperText={errors.partPackage?.message}
            />
            <NumericInput
                register={register}
                id="price"
                label="Price"
                defaultValue={initialData?.price}
                error={!!errors.price}
                touched={!!touchedFields.price}
                helperText={errors.price?.message}
                min={0.01}
                step={0.01}
                startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                }
            />
            <NumericInput
                register={register}
                id="count"
                label="Count"
                defaultValue={initialData?.count}
                error={!!errors.count}
                touched={!!touchedFields.count}
                helperText={errors.count?.message}
                min={0}
                step={1}
            />
        </EditorDialog>
    );
};

export default PartEditorDialog;
