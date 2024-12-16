import { Dialog, DialogContent } from "@mui/material";
import EditorDialogTitle from "./EditorDialogTitle";
import { Entity, EntityType } from "../../common/entity";
import CloseButton from "./CloseButton";
import React from "react";
import EditorDialogActions from "./EditorDialogActions";

export interface EditorDialogProps<T extends Entity> {
    isOpen: boolean;
    onClose: () => void;
    initialEntity?: T | null;
}

interface Props {
    isOpen: boolean;
    isEditing: boolean;
    isLoading: boolean;
    isValid: boolean;
    entityType: EntityType;
    onClose: () => void;
    onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
    children: React.ReactNode;
}

const EditorDialog = ({
    isOpen,
    isEditing,
    isLoading,
    isValid,
    entityType,
    onClose,
    onSubmit,
    children,
}: Props) => {
    return (
        <Dialog
            open={isOpen}
            PaperProps={{
                component: "form",
                onSubmit: onSubmit,
            }}
        >
            <EditorDialogTitle isEditing={isEditing} entityType={entityType} />
            <CloseButton onClick={onClose} />
            <DialogContent>{children}</DialogContent>
            <EditorDialogActions
                isEditing={isEditing}
                isLoading={isLoading}
                isValid={isValid}
                onClose={onClose}
            />
        </Dialog>
    );
};

export default EditorDialog;
