import { TextField } from "@mui/material";
import { ReactNode } from "react";
import { FieldValues } from "react-hook-form";
import CommonInputProps from "./commonInputProps";

interface Props<T extends FieldValues> extends CommonInputProps<number, T> {
    min?: number;
    step: number;
    startAdornment?: ReactNode;
}

const NumericInput = <T extends FieldValues>({
    register,
    id,
    label,
    defaultValue,
    error,
    touched,
    helperText,
    min,
    step,
    startAdornment,
    ...props
}: Props<T>) => {
    return (
        <TextField
            {...register?.(id, { valueAsNumber: true })}
            id={id}
            label={label}
            required
            fullWidth
            type="number"
            variant="outlined"
            margin="normal"
            defaultValue={defaultValue ?? ""}
            error={!!error && touched}
            helperText={touched ? helperText : ""}
            slotProps={{
                htmlInput: {
                    step: step,
                    min: min || undefined,
                },
                input: {
                    startAdornment: startAdornment,
                },
            }}
            {...props}
        />
    );
};

export default NumericInput;
