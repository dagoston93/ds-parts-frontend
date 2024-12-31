import { Box, MenuItem, TextField } from "@mui/material";
import { FieldValues } from "react-hook-form";
import CommonInputProps from "./commonInputProps";
import { File } from "../../services/fileService";
import { BACKEND_URL } from "../../services/apiClient";

interface Props<T extends FieldValues> extends CommonInputProps<string, T> {
    images: File[] | null | undefined;
    defaultOption?: { name: string; value: string };
}

const ImageDropdownInput = <T extends FieldValues>({
    register,
    id,
    label,
    images,
    defaultValue,
    defaultOption,
    error,
    touched,
    helperText,
    ...props
}: Props<T>) => {
    return (
        <TextField
            {...register(id)}
            id={id}
            name={id}
            label={label}
            fullWidth
            select
            margin="normal"
            defaultValue={defaultValue || defaultOption?.value || ""}
            error={!!error && touched}
            helperText={touched ? helperText : ""}
            {...props}
        >
            {!!defaultOption && (
                <MenuItem key={defaultOption.value} value={defaultOption.value}>
                    {defaultOption.name}
                </MenuItem>
            )}
            {images?.map((image) => (
                <MenuItem key={image._id} value={image._id}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <img
                            src={`${BACKEND_URL}/images/${image.fileName}`}
                            alt={image.name}
                            style={{
                                width: 48,
                                height: 48,
                                objectFit: "cover",
                            }}
                        />
                        {image.name}
                    </Box>
                </MenuItem>
            ))}
        </TextField>
    );
};

export default ImageDropdownInput;
