import { useState } from "react";

const useEditorDialogState = <TEntity>(initialEntity: TEntity | null) => {
    const [selectedEntity, setSelectedEntity] = useState(initialEntity);
    const [isDialogOpen, setDialogOpen] = useState(false);

    const openDialog = (part: TEntity | null = null) => {
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
