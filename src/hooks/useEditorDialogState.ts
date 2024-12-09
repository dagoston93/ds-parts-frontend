import { useState } from "react";

const useEditorDialogState = <T>(initialEntity: T | null) => {
    const [selectedEntity, setSelectedEntity] = useState(initialEntity);
    const [isDialogOpen, setDialogOpen] = useState(false);

    const openDialog = (part: T | null = null) => {
        setSelectedEntity(part);
        setDialogOpen(true);
    };

    const closeDialog = () => {
        setSelectedEntity(null);
        setDialogOpen(false);
    };

    return {
        selectedEntity,
        isDialogOpen,
        openDialog,
        closeDialog,
    };
};

export default useEditorDialogState;
