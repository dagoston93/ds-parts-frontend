import { TextField } from "@mui/material";
import { ComponentProps } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface CommonInputProps<TValue, TData extends FieldValues>
    extends ComponentProps<typeof TextField> {
    register: UseFormRegister<TData>;
    id: Path<TData>;
    label: string;
    defaultValue: TValue | null | undefined;
    error: boolean;
    touched: boolean;
    helperText: string | null | undefined;
}

export default CommonInputProps;
