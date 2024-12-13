import { TextField } from "@mui/material";
import { ReactNode } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface Props<T extends FieldValues>
    extends React.ComponentProps<typeof TextField> {
    register: UseFormRegister<T>;
    id: Path<T>;
    label: string;
    defaultValue: number | null | undefined;
    error: boolean;
    touched: boolean;
    helperText: string | null | undefined;
    min: number;
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
            {...register(id, { valueAsNumber: true })}
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
                    min: min,
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
