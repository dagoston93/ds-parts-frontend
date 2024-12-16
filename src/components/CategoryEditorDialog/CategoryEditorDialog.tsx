import useAddCategory from "../../hooks/categories/useAddCategory";
import useUpdateCategory from "../../hooks/categories/useUpdateCategory";

import {
    Category,
    CategoryFormData,
    categoryToCategoryFormData,
} from "../../services/categoryService";

import validationSchema from "./validationSchema";
import TextInput from "../EditorDialog/TextInput";
import { ENTITY_TYPE_CATEGORY } from "../../common/entity";
import EditorDialog, { EditorDialogProps } from "../EditorDialog/EditorDialog";

import useEditorDialog from "../EditorDialog/useEditorDialog";
import useCategories from "../../hooks/categories/useCategories";
import DropdownInput from "../EditorDialog/DropdownInput";

const CategoryEditorDialog = ({
    isOpen,
    onClose,
    initialEntity,
}: EditorDialogProps<Category>) => {
    const { data: categories } = useCategories(() => {});

    const processFormData = (data: CategoryFormData) => {
        if (data.parent === "") {
            const { parent, ...rest } = data;
            return rest;
        }
        return data;
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
    } = useEditorDialog<Category, CategoryFormData>({
        initialEntity: initialEntity,
        defaultFormValues: {
            name: "",
            parent: "",
        },
        validationSchema: validationSchema,
        entityToFormData: categoryToCategoryFormData,
        onClose: onClose,
        addMutationFn: useAddCategory,
        updateMutationFn: useUpdateCategory,
        processFormData: processFormData,
    });

    const displayedCategories = isEditing
        ? categories?.filter((c) => c._id !== initialEntity!._id)
        : categories;

    return (
        <EditorDialog
            isOpen={isOpen}
            isEditing={isEditing}
            isLoading={isLoading}
            isValid={isValid}
            entityType={ENTITY_TYPE_CATEGORY}
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
            <DropdownInput
                register={register}
                id="parent"
                label="Parent"
                options={displayedCategories}
                defaultValue={initialData?.parent}
                error={!!errors.parent}
                touched={!!touchedFields.parent}
                helperText={errors.parent?.message}
                required={false}
            />
        </EditorDialog>
    );
};

export default CategoryEditorDialog;
