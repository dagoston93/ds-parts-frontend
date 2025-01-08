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
import { useSession } from "../../auth/useSession";
import {
    Checkbox,
    Divider,
    FormControlLabel,
    IconButton,
    Stack,
} from "@mui/material";
import { MdAddToPhotos, MdClose } from "react-icons/md";
import StringDropdownInput from "../EditorDialog/StringDropdownInput";
import {
    CustomFieldType,
    getCustomFieldTypes,
} from "../../services/customFieldService";

import { v4 as uuid } from "uuid";

const CategoryEditorDialog = ({
    isOpen,
    onClose,
    initialEntity,
}: EditorDialogProps<Category>) => {
    const { session } = useSession();

    if (!session?.user?.rights.canModifyParts) {
        return null;
    }

    const { data: categories } = useCategories(() => {});

    const processFormData = (data: CategoryFormData) => {
        let processedData = { ...data };

        if (data.parent === "-" || data.parent === "") {
            const { parent, ...rest } = data;
            processedData = rest;
        }

        processedData.customFields = data.customFields.filter(
            (field) => field.name !== ""
        );

        return processedData;
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
        watch,
        setValue,
        handleClose,
        onSubmit,
    } = useEditorDialog<Category, CategoryFormData>({
        initialEntity: initialEntity,
        defaultFormValues: {
            name: "",
            parent: "-",
            customFields: [],
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
                defaultOption={{ name: "None", value: "-" }}
                error={!!errors.parent}
                touched={!!touchedFields.parent}
                helperText={errors.parent?.message}
                required={false}
            />
            <Divider textAlign="left" sx={{ mb: 2 }}>
                Custom Fields
            </Divider>
            {watch("customFields")?.map((field, index) => (
                <Stack direction="column" key={field.id}>
                    <TextInput
                        id={`customFields[${index}].name`}
                        label="Name"
                        defaultValue={field.name}
                        error={false}
                        touched={false}
                        helperText=""
                        onChange={(e) => {
                            const newCustomFields = [
                                ...(watch("customFields") || []),
                            ];
                            newCustomFields[index].name = e.target.value;
                            setValue("customFields", newCustomFields);
                        }}
                    />
                    <StringDropdownInput
                        id={`customFields[${index}].type`}
                        label="Type"
                        options={getCustomFieldTypes()}
                        defaultValue={field.type}
                        error={false}
                        touched={false}
                        helperText=""
                        onChange={(e) => {
                            const newCustomFields = [
                                ...(watch("customFields") || []),
                            ];
                            newCustomFields[index].type = e.target
                                .value as CustomFieldType;
                            setValue("customFields", newCustomFields);
                        }}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                defaultChecked={field.required}
                                onChange={(e) => {
                                    const newCustomFields = [
                                        ...(watch("customFields") || []),
                                    ];
                                    newCustomFields[index].required =
                                        e.target.checked;
                                    setValue("customFields", newCustomFields);
                                }}
                            />
                        }
                        label="Required"
                    />
                    <IconButton
                        onClick={() => {
                            const newCustomFields = [
                                ...(watch("customFields") || []),
                            ];
                            newCustomFields.splice(index, 1);
                            setValue("customFields", newCustomFields);
                        }}
                        color="error"
                        disabled={isLoading}
                    >
                        <MdClose />
                    </IconButton>
                    <Divider />
                </Stack>
            ))}
            <IconButton
                onClick={() => {
                    const newCustomFields = [...(watch("customFields") || [])];
                    newCustomFields.push({
                        id: uuid(),
                        name: "",
                        type: "String",
                        required: false,
                    });
                    setValue("customFields", newCustomFields);
                }}
                color="primary"
                disabled={isLoading}
            >
                <MdAddToPhotos />
            </IconButton>
        </EditorDialog>
    );
};

export default CategoryEditorDialog;
