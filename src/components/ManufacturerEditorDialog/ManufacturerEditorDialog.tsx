import useAddManufacturer from "../../hooks/manufacturers/useAddManufacturer";
import useUpdateManufacturer from "../../hooks/manufacturers/useUpdateManufacturer";

import {
    Manufacturer,
    ManufacturerFormData,
    manufacturerToManufacturerFormData,
} from "../../services/manufacturerService";

import validationSchema from "./validationSchema";
import TextInput from "../EditorDialog/TextInput";
import { ENTITY_TYPE_MANUFACTURER } from "../../common/entity";
import EditorDialog, { EditorDialogProps } from "../EditorDialog/EditorDialog";
import useEditorDialog from "../EditorDialog/useEditorDialog";
import { useSession } from "../../auth/useSession";

const ManufacturerEditorDialog = ({
    isOpen,
    onClose,
    initialEntity,
}: EditorDialogProps<Manufacturer>) => {
    const { session } = useSession();

    if (!session?.user?.rights.canModifyParts) {
        return null;
    }

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
    } = useEditorDialog<Manufacturer, ManufacturerFormData>({
        initialEntity: initialEntity,
        defaultFormValues: {
            name: "",
        },
        validationSchema: validationSchema,
        entityToFormData: manufacturerToManufacturerFormData,
        onClose: onClose,
        addMutationFn: useAddManufacturer,
        updateMutationFn: useUpdateManufacturer,
    });

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
