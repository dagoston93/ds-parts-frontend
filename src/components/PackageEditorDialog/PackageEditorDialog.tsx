import useAddPackage from "../../hooks/packages/useAddPackage";
import useUpdatePackage from "../../hooks/packages/useUpdatePackage";

import {
    Package,
    PackageFormData,
    packageToPackageFormData,
    possiblePackageTypes,
} from "../../services/packageService";

import validationSchema from "./validationSchema";
import TextInput from "../EditorDialog/TextInput";
import StringDropdownInput from "../EditorDialog/StringDropdownInput";
import { ENTITY_TYPE_PACKAGE } from "../../common/entity";
import EditorDialog, { EditorDialogProps } from "../EditorDialog/EditorDialog";
import useEditorDialog from "../EditorDialog/useEditorDialog";

const PackageEditorDialog = ({
    isOpen,
    onClose,
    initialEntity,
}: EditorDialogProps<Package>) => {
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
    } = useEditorDialog<Package, PackageFormData>({
        initialEntity: initialEntity,
        defaultFormValues: {
            name: "",
            type: "THT",
        },
        validationSchema: validationSchema,
        entityToFormData: packageToPackageFormData,
        onClose: onClose,
        addMutationFn: useAddPackage,
        updateMutationFn: useUpdatePackage,
    });

    return (
        <EditorDialog
            isOpen={isOpen}
            isEditing={isEditing}
            isLoading={isLoading}
            isValid={isValid}
            entityType={ENTITY_TYPE_PACKAGE}
            onClose={handleClose}
            onSubmit={handleSubmit(onSubmit)}
        >
            <TextInput
                register={register}
                id="name"
                label="Package name"
                defaultValue={initialData?.name}
                error={!!errors.name}
                touched={!!touchedFields.name}
                helperText={errors.name?.message}
            />
            <StringDropdownInput
                register={register}
                id="type"
                label="Type"
                options={[...possiblePackageTypes]}
                defaultValue={initialData?.type}
                error={!!errors.type}
                touched={!!touchedFields.type}
                helperText={errors.type?.message}
            />
        </EditorDialog>
    );
};

export default PackageEditorDialog;
