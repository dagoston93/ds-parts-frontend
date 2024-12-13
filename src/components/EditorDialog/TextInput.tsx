import { TextField } from "@mui/material";
import React from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface Props<T extends FieldValues>
    extends React.ComponentProps<typeof TextField> {
    register: UseFormRegister<T>;
    id: Path<T>;
    label: string;
    defaultValue: string | null | undefined;
    error: boolean;
    touched: boolean;
    helperText: string | null | undefined;
}

const TextInput = <T extends FieldValues>({
    register,
    id,
    label,
    defaultValue,
    error,
    touched,
    helperText,
    ...props
}: Props<T>) => {
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
