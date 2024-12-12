import { MenuItem, TextField } from "@mui/material";
import React from "react";

interface Props extends React.ComponentProps<typeof TextField> {
    id: string;
    label: string;
    options:
        | {
              _id: string;
              name: string;
          }[]
        | null
        | undefined;
    defaultValue: string | null | undefined;
    error: boolean;
    touched: boolean;
    helperText: string | null | undefined;
}

const DropdownInput = ({
    id,
    label,
    options,
    defaultValue,
    error,
    touched,
    helperText,
    ...props
}: Props) => {
    return (
        <TextField
            id={id}
            name={id}
            label={label}
            required
            fullWidth
            select
            margin="normal"
            defaultValue={defaultValue ?? ""}
            error={!!error && touched}
            helperText={touched ? helperText : ""}
            {...props}
        >
            {options?.map((option) => (
                <MenuItem key={option._id} value={option._id}>
                    {option.name}
                </MenuItem>
            ))}
        </TextField>
    );
};

export default DropdownInput;
