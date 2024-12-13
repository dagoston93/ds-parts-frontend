import { TextField } from "@mui/material";
import { FieldValues } from "react-hook-form";
import CommonInputProps from "./commonInputProps";

const TextInput = <T extends FieldValues>({
    register,
    id,
    label,
    defaultValue,
    error,
    touched,
    helperText,
    ...props
}: CommonInputProps<string, T>) => {
    return (
        <TextField
            {...register(id)}
            id={id}
            label={label}
            required
            fullWidth
            type="text"
            variant="outlined"
            margin="normal"
            defaultValue={defaultValue ?? ""}
            error={!!error && touched}
            helperText={touched ? helperText : ""}
            {...props}
        />
    );
};

export default TextInput;
