import { MenuItem, TextField } from "@mui/material";
import { FieldValues } from "react-hook-form";
import CommonInputProps from "./commonInputProps";

interface Props<T extends FieldValues> extends CommonInputProps<string, T> {
    options: string[] | null | undefined;
    defaultOption?: { name: string; value: string };
}

const StringDropdownInput = <T extends FieldValues>({
    register,
    id,
    label,
    options,
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
            required
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
            {options?.map((option, idx) => (
                <MenuItem key={idx} value={option}>
                    {option}
                </MenuItem>
            ))}
        </TextField>
    );
};

export default StringDropdownInput;
