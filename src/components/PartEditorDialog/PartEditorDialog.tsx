import { Button, InputAdornment } from "@mui/material";

import useManufacturers from "../../hooks/manufacturers/useManufacturers";
import usePackages from "../../hooks/packages/usePackages";
import useCategories from "../../hooks/categories/useCategories";

import {
    Part,
    PartFormData,
    partToPartFormData,
} from "../../services/partService";

import validationSchema from "./validationSchema";
import useAddPart from "../../hooks/parts/useAddPart";
import useUpdatePart from "../../hooks/parts/useUpdatePart";
import DropdownInput from "../EditorDialog/DropdownInput";
import TextInput from "../EditorDialog/TextInput";
import NumericInput from "../EditorDialog/NumericInput";
import { ENTITY_TYPE_PART } from "../../common/entity";
import EditorDialog, { EditorDialogProps } from "../EditorDialog/EditorDialog";
import useEditorDialog from "../EditorDialog/useEditorDialog";
import { useSession } from "../../auth/useSession";
import { useState } from "react";
import UploadDialog from "../UploadDialog/UploadDialog";

const PartEditorDialog = ({
    isOpen,
    onClose,
    initialEntity,
}: EditorDialogProps<Part>) => {
    const { session } = useSession();

    if (!session?.user?.rights.canModifyParts) {
        return null;
    }

    const { data: manufacturers } = useManufacturers(() => {});
    const { data: categories } = useCategories(() => {});
    const { data: packages } = usePackages(() => {});

    const [isUploadImageDialogOpen, setUploadImageDialogOpen] = useState(false);
    const handleUploadImageButtonClick = () => {
        setUploadImageDialogOpen(true);
    };
    const handleUploadImageDialogClose = () => {
        setUploadImageDialogOpen(false);
    };

    const {
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
    } = useEditorDialog<Part, PartFormData>({
        initialEntity: initialEntity,
        defaultFormValues: {
            category: "",
            name: "",
            manufacturer: "",
            partPackage: "",
            price: null,
            count: null,
        },
        validationSchema: validationSchema,
        entityToFormData: partToPartFormData,
        onClose: onClose,
        addMutationFn: useAddPart,
        updateMutationFn: useUpdatePart,
    });

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
            <Button
                onClick={() => handleUploadImageButtonClick()}
                variant="outlined"
                disabled={isLoading}
            >
                Upload
            </Button>
            <UploadDialog
                isOpen={isUploadImageDialogOpen}
                onClose={handleUploadImageDialogClose}
                type="Image"
            />
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
