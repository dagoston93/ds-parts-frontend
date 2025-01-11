import useAddContainer from "../../hooks/containers/useAddContainer";
import useUpdateContainer from "../../hooks/containers/useUpdateContainer";

import {
    Container,
    ContainerFormData,
    containerToContainerFormData,
} from "../../services/containerService";

import validationSchema from "./validationSchema";
import TextInput from "../EditorDialog/TextInput";
import { ENTITY_TYPE_CONTAINER } from "../../common/entity";
import EditorDialog, { EditorDialogProps } from "../EditorDialog/EditorDialog";
import useEditorDialog from "../EditorDialog/useEditorDialog";
import { useSession } from "../../auth/useSession";

const ContainerEditorDialog = ({
    isOpen,
    onClose,
    initialEntity,
}: EditorDialogProps<Container>) => {
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
    } = useEditorDialog<Container, ContainerFormData>({
        initialEntity: initialEntity,
        defaultFormValues: {
            name: "",
        },
        validationSchema: validationSchema,
        entityToFormData: containerToContainerFormData,
        onClose: onClose,
        addMutationFn: useAddContainer,
        updateMutationFn: useUpdateContainer,
    });

    return (
        <EditorDialog
            isOpen={isOpen}
            isEditing={isEditing}
            isLoading={isLoading}
            isValid={isValid}
            entityType={ENTITY_TYPE_CONTAINER}
            onClose={handleClose}
            onSubmit={handleSubmit(onSubmit)}
        >
            <TextInput
                register={register}
                id="name"
                label="Container name"
                defaultValue={initialData?.name}
                error={!!errors.name}
                touched={!!touchedFields.name}
                helperText={errors.name?.message}
            />
        </EditorDialog>
    );
};

export default ContainerEditorDialog;
