import { Divider, IconButton, InputAdornment, Stack } from "@mui/material";

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
import { useEffect, useState } from "react";
import UploadDialog from "../UploadDialog/UploadDialog";
import ImageDropdownInput from "../EditorDialog/ImageDropdownInput";
import useImages from "../../hooks/files/useImages";
import { FaFileUpload } from "react-icons/fa";
import { File } from "../../services/fileService";
import { MdAddToPhotos, MdClose } from "react-icons/md";
import useFiles from "../../hooks/files/useFiles";
import {
    CustomField,
    getUnitGroupByType,
} from "../../services/customFieldService";
import StringDropdownInput from "../EditorDialog/StringDropdownInput";
import useContainers from "../../hooks/containers/useContainers";

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
    const { data: containers } = useContainers(() => {});
    const { data: packages } = usePackages(() => {});
    const { data: images } = useImages(() => {});
    const { data: files } = useFiles(() => {});

    const [isUploadDialogOpen, setUploadDialogOpen] = useState(false);
    const [customFields, setCustomFields] = useState<CustomField[]>([]);

    const [uploadHandler, setUploadHandler] = useState<
        ((id: string) => void) | null
    >(null);
    const [uploadDialogType, setUploadDialogType] = useState<"File" | "Image">(
        "Image"
    );

    const processFormData = (data: PartFormData) => {
        let processedData = data;

        if (data.primaryImage === "") {
            const { primaryImage, ...rest } = data;
            processedData = rest;
        }

        processedData.images = data.images.filter((i) => i !== "");
        processedData.files = data.files.filter((f) => f !== "");

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
        watch,
        register,
        setValue,
        handleClose,
        onSubmit,
    } = useEditorDialog<Part, PartFormData>({
        initialEntity: initialEntity,
        defaultFormValues: {
            category: "",
            container: "",
            name: "",
            manufacturer: "",
            partPackage: "",
            price: null,
            count: null,
            primaryImage: "",
            images: [],
            files: [],
            customFieldValues: {},
        },
        validationSchema: validationSchema,
        entityToFormData: partToPartFormData,
        onClose: onClose,
        addMutationFn: useAddPart,
        updateMutationFn: useUpdatePart,
        processFormData: processFormData,
    });

    const handleUploadPrimaryImageButtonClick = () => {
        setUploadDialogType("Image");
        setUploadHandler(() => (id: string) => {
            setValue("primaryImage", id);
        });
        setUploadDialogOpen(true);
    };

    const handleUploadOtherImageButtonClick = (idx: number) => {
        setUploadDialogType("Image");
        setUploadHandler(() => (id: string) => {
            const newImages = [...watch("images")];
            newImages[idx] = id;
            setValue("images", newImages);
        });
        setUploadDialogOpen(true);
    };

    const handleUploadFileButtonClick = (idx: number) => {
        setUploadDialogType("File");
        setUploadHandler(() => (id: string) => {
            const newFiles = [...watch("files")];
            newFiles[idx] = id;
            setValue("files", newFiles);
        });
        setUploadDialogOpen(true);
    };

    const handleUploadDialogClose = (file?: File | null) => {
        setUploadDialogOpen(false);

        if (file) {
            uploadHandler?.(file._id);
        }
    };

    const collectCustomFields = (category: string) => {
        let newCustomFields: CustomField[] = [];

        const collectCustomFieldsRecursive = (category: string) => {
            const categoryObj = categories?.find((c) => c._id === category);
            if (!categoryObj) {
                return;
            }

            newCustomFields = newCustomFields.concat(
                categoryObj.customFields || []
            );

            if (categoryObj.parent) {
                collectCustomFieldsRecursive(categoryObj.parent._id);
            }
        };

        collectCustomFieldsRecursive(category);
        setCustomFields(newCustomFields);
    };

    useEffect(() => {
        collectCustomFields(initialData?.category || "");
    }, [isOpen, initialEntity]);

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
            <UploadDialog
                isOpen={isUploadDialogOpen}
                onClose={handleUploadDialogClose}
                type={uploadDialogType}
            />
            <Divider textAlign="left">Primary info</Divider>
            <DropdownInput
                register={register}
                id="category"
                label="Category"
                options={categories}
                defaultValue={initialData?.category}
                error={!!errors.category}
                touched={!!touchedFields.category}
                helperText={errors.category?.message}
                onChange={(e) => collectCustomFields(e.target.value)}
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
            <DropdownInput
                register={register}
                id="container"
                label="Container"
                options={containers}
                defaultValue={initialData?.container}
                error={!!errors.container}
                touched={!!touchedFields.container}
                helperText={errors.container?.message}
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
            <Divider textAlign="left" sx={{ mb: 1 }}>
                Images
            </Divider>
            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <ImageDropdownInput
                    register={register}
                    id="primaryImage"
                    label="Primary image"
                    images={images}
                    value={watch("primaryImage") || ""}
                    defaultValue={initialData?.primaryImage}
                    error={!!errors.primaryImage}
                    touched={!!touchedFields.primaryImage}
                    helperText={errors.primaryImage?.message}
                />
                <IconButton
                    onClick={() => {
                        setValue("primaryImage", "");
                    }}
                    color="error"
                    disabled={isLoading}
                >
                    <MdClose />
                </IconButton>
                <IconButton
                    onClick={() => handleUploadPrimaryImageButtonClick()}
                    color="primary"
                    disabled={isLoading}
                >
                    <FaFileUpload />
                </IconButton>
            </Stack>
            {watch("images")?.map((_, idx) => (
                <Stack direction="row" spacing={2} sx={{ mb: 2 }} key={idx}>
                    <ImageDropdownInput
                        id={`image_${idx}`}
                        label={`Image ${idx + 1}`}
                        images={images}
                        value={watch("images")[idx] || ""}
                        defaultValue={initialData?.images[idx]}
                        error={false}
                        touched={false}
                        helperText=""
                        onChange={(e) => {
                            const newImages = [...watch("images")];
                            newImages[idx] = e.target.value;
                            setValue("images", newImages);
                        }}
                    />
                    <IconButton
                        onClick={() => {
                            const newImages = [...watch("images")];
                            newImages.splice(idx, 1);
                            setValue("images", newImages);
                        }}
                        color="error"
                        disabled={isLoading}
                    >
                        <MdClose />
                    </IconButton>
                    <IconButton
                        onClick={() => handleUploadOtherImageButtonClick(idx)}
                        color="primary"
                        disabled={isLoading}
                    >
                        <FaFileUpload />
                    </IconButton>
                </Stack>
            ))}
            <IconButton
                onClick={() => {
                    const newImages = [...(watch("images") || [])];
                    newImages.push("");
                    setValue("images", newImages);
                }}
                color="primary"
                disabled={isLoading}
            >
                <MdAddToPhotos />
            </IconButton>
            <Divider textAlign="left" sx={{ mb: 2 }}>
                Files
            </Divider>
            {watch("files")?.map((_, idx) => (
                <Stack direction="row" spacing={2} sx={{ mb: 2 }} key={idx}>
                    <DropdownInput
                        id={`file_${idx}`}
                        label={`File ${idx + 1}`}
                        options={files}
                        value={watch("files")[idx] || ""}
                        defaultValue={initialData?.files[idx]}
                        error={false}
                        touched={false}
                        helperText=""
                        onChange={(e) => {
                            const newFiles = [...watch("files")];
                            newFiles[idx] = e.target.value;
                            setValue("files", newFiles);
                        }}
                        required={false}
                    />
                    <IconButton
                        onClick={() => {
                            const newFiles = [...watch("files")];
                            newFiles.splice(idx, 1);
                            setValue("files", newFiles);
                        }}
                        color="error"
                        disabled={isLoading}
                    >
                        <MdClose />
                    </IconButton>
                    <IconButton
                        onClick={() => handleUploadFileButtonClick(idx)}
                        color="primary"
                        disabled={isLoading}
                    >
                        <FaFileUpload />
                    </IconButton>
                </Stack>
            ))}
            <IconButton
                onClick={() => {
                    const newFiles = [...(watch("files") || [])];
                    newFiles.push("");
                    setValue("files", newFiles);
                }}
                color="primary"
                disabled={isLoading}
            >
                <MdAddToPhotos />
            </IconButton>
            {customFields.length > 0 && (
                <Divider textAlign="left" sx={{ mb: 2 }}>
                    Custom fields
                </Divider>
            )}
            {customFields.map((field) => {
                if (
                    field.type !== "Integer" &&
                    field.type !== "Float" &&
                    field.type !== "String"
                ) {
                    let unitGroup = getUnitGroupByType(field.type);
                    let units: string[] = [];

                    if (unitGroup) {
                        units = [
                            ...unitGroup.smallerUnits,
                            unitGroup.baseUnit,
                            ...unitGroup.largerUnits,
                        ];
                    }

                    return (
                        <Stack direction="row" key={field.id}>
                            <NumericInput
                                id={field.id}
                                label={field.name}
                                defaultValue={
                                    watch("customFieldValues")?.[field.id]
                                        ?.numericValue || 0
                                }
                                error={false}
                                touched={false}
                                helperText=""
                                min={0}
                                step={0.01}
                                sx={{ mr: 1 }}
                                required={field.required}
                                onChange={(e) => {
                                    let newCustomFieldValues = {
                                        ...watch("customFieldValues"),
                                    };
                                    newCustomFieldValues[field.id] = {
                                        ...newCustomFieldValues[field.id],
                                        numericValue: parseFloat(
                                            e.target.value
                                        ),
                                    };
                                    setValue(
                                        "customFieldValues",
                                        newCustomFieldValues
                                    );
                                }}
                            />
                            <StringDropdownInput
                                id={`${field.id}_unit`}
                                label="Unit"
                                options={units}
                                defaultValue={
                                    watch("customFieldValues")?.[field.id]
                                        ?.unit ||
                                    unitGroup?.baseUnit ||
                                    ""
                                }
                                error={false}
                                touched={false}
                                helperText=""
                                required={field.required}
                                onChange={(e) => {
                                    let newCustomFieldValues = {
                                        ...watch("customFieldValues"),
                                    };
                                    newCustomFieldValues[field.id] = {
                                        ...newCustomFieldValues[field.id],
                                        unit: e.target.value,
                                    };
                                    setValue(
                                        "customFieldValues",
                                        newCustomFieldValues
                                    );
                                }}
                            />
                        </Stack>
                    );
                } else if (field.type === "String") {
                    return (
                        <TextInput
                            id={field.id}
                            label={field.name}
                            defaultValue={
                                watch("customFieldValues")?.[field.id]
                                    ?.stringValue || ""
                            }
                            error={false}
                            touched={false}
                            helperText=""
                            required={field.required}
                            onChange={(e) => {
                                let newCustomFieldValues = {
                                    ...watch("customFieldValues"),
                                };
                                newCustomFieldValues[field.id] = {
                                    ...newCustomFieldValues[field.id],
                                    stringValue: e.target.value,
                                };
                                setValue(
                                    "customFieldValues",
                                    newCustomFieldValues
                                );
                            }}
                        />
                    );
                } else if (field.type === "Integer" || field.type === "Float") {
                    const step = field.type === "Integer" ? 1 : 0.01;
                    return (
                        <NumericInput
                            id={field.id}
                            label={field.name}
                            defaultValue={
                                watch("customFieldValues")?.[field.id]
                                    ?.numericValue || 0
                            }
                            error={false}
                            touched={false}
                            helperText=""
                            min={0}
                            step={step}
                            required={field.required}
                            onChange={(e) => {
                                let newCustomFieldValues = {
                                    ...watch("customFieldValues"),
                                };
                                newCustomFieldValues[field.id] = {
                                    ...newCustomFieldValues[field.id],
                                    numericValue: parseFloat(e.target.value),
                                };
                                setValue(
                                    "customFieldValues",
                                    newCustomFieldValues
                                );
                            }}
                        />
                    );
                }
            })}
        </EditorDialog>
    );
};

export default PartEditorDialog;
