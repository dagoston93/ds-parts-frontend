import useAddCategory from "../../hooks/categories/useAddCategory";
import useUpdateCategory from "../../hooks/categories/useUpdateCategory";

import {
    Category,
    CategoryFormData,
    categoryToCategoryFormData,
    CustomEnumField,
    CustomFieldType,
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
import { MdAddToPhotos } from "react-icons/md";
import StringDropdownInput from "../EditorDialog/StringDropdownInput";
import NumericInput from "../EditorDialog/NumericInput";

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
        if (data.parent === "-" || data.parent === "") {
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
        setValue,
        watch,
        handleClose,
        onSubmit,
    } = useEditorDialog<Category, CategoryFormData>({
        initialEntity: initialEntity,
        defaultFormValues: {
            name: "",
            parent: "-",
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
            <Divider textAlign="left">Custom fields</Divider>
            {watch("customFields")?.map((field, idx) => (
                <>
                    <TextInput
                        id={`name_${idx}`}
                        label="Name"
                        defaultValue={field.name}
                        error={false}
                        touched={false}
                        helperText=""
                    />
                    <StringDropdownInput
                        id={`type_${idx}`}
                        label="Type"
                        options={["string", "number", "enum"]}
                        defaultValue={field.type}
                        error={false}
                        touched={false}
                        helperText=""
                        onChange={(e) => {
                            const newCustomFields = [
                                ...(watch("customFields") || []),
                            ];
                            if (e.target.value === "string") {
                                newCustomFields[idx] = {
                                    name:
                                        watch("customFields")?.[idx].name || "",
                                    required:
                                        watch("customFields")?.[idx].required ||
                                        false,
                                    type: "string",
                                    minLength: 0,
                                    maxLength: 0,
                                };
                            } else if (e.target.value === "number") {
                                newCustomFields[idx] = {
                                    name:
                                        watch("customFields")?.[idx].name || "",
                                    required:
                                        watch("customFields")?.[idx].required ||
                                        false,
                                    type: "number",
                                    decimal: true,
                                    min: null,
                                    max: null,
                                    unitGroupName: null,
                                };
                            } else if (e.target.value === "enum") {
                                newCustomFields[idx] = {
                                    name:
                                        watch("customFields")?.[idx].name || "",
                                    required:
                                        watch("customFields")?.[idx].required ||
                                        false,
                                    type: "enum",
                                    values: [],
                                };
                            }
                            setValue("customFields", newCustomFields);
                        }}
                    />
                    {field.type == "string" && (
                        <>
                            <NumericInput
                                id={`minLength_${idx}`}
                                label="Min length"
                                defaultValue={0}
                                error={false}
                                touched={false}
                                helperText=""
                                min={0}
                                step={1}
                            />
                            <NumericInput
                                id={`maxLength_${idx}`}
                                label="Max length"
                                defaultValue={0}
                                error={false}
                                touched={false}
                                helperText=""
                                min={0}
                                step={1}
                            />
                        </>
                    )}
                    {field.type == "number" && (
                        <>
                            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                                <FormControlLabel
                                    control={<Checkbox defaultChecked />}
                                    label="Min"
                                />
                                <NumericInput
                                    id={`min_${idx}`}
                                    label="Min"
                                    defaultValue={0}
                                    error={false}
                                    touched={false}
                                    helperText=""
                                    min={-Infinity}
                                    step={0.01}
                                />
                            </Stack>
                            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                                <FormControlLabel
                                    control={<Checkbox defaultChecked />}
                                    label="Max"
                                />
                                <NumericInput
                                    id={`max_${idx}`}
                                    label="Max"
                                    defaultValue={0}
                                    error={false}
                                    touched={false}
                                    helperText=""
                                    min={-Infinity}
                                    step={0.01}
                                />
                            </Stack>
                            <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label="Decimals enabled"
                            />
                            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                                <FormControlLabel
                                    control={<Checkbox defaultChecked />}
                                    label="Unit"
                                />
                                <StringDropdownInput
                                    id={`unit_${idx}`}
                                    label="Unit"
                                    options={[
                                        "capacitance",
                                        "current",
                                        "inductance",
                                        "resistance",
                                        "voltage",
                                        "percentage",
                                    ]}
                                    defaultValue={"capacitance"}
                                    error={false}
                                    touched={false}
                                    helperText=""
                                />
                            </Stack>
                        </>
                    )}
                    {field.type == "enum" && (
                        <>
                            {field.values.map((_, eidx) => (
                                <TextInput
                                    id={`enum_val_${idx}_${eidx}`}
                                    label={`Value ${eidx + 1}`}
                                    defaultValue=""
                                    error={false}
                                    touched={false}
                                    helperText=""
                                />
                            ))}
                            <IconButton
                                onClick={() => {
                                    const newFields = [
                                        ...(watch("customFields") || []),
                                    ];
                                    (
                                        newFields[idx] as CustomEnumField
                                    ).values.push("");
                                    setValue("customFields", newFields);
                                }}
                                color="primary"
                                disabled={isLoading}
                            >
                                <MdAddToPhotos />
                            </IconButton>
                        </>
                    )}
                    <Divider />
                </>
            ))}
            <IconButton
                onClick={() => {
                    const newFields = [...(watch("customFields") || [])];
                    newFields.push({
                        name: "",
                        type: "string",
                        required: false,
                        minLength: 0,
                        maxLength: 0,
                    });
                    setValue("customFields", newFields);
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
