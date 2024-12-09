import { useMutation, useQueryClient } from "@tanstack/react-query";
import partService, { Part } from "../../services/partService";

interface DeletePartContext {
    originalParts: Part[];
}

const useDeletePart = (
    onSuccess: (message: string) => void,
    onError: (message: string) => void
) => {
    const queryClient = useQueryClient();

    return useMutation<Part, Error, string, DeletePartContext>({
        mutationFn: partService.delete,
        onMutate: (deletedPartId: string) => {
            const originalParts =
                queryClient.getQueryData<Part[]>(["parts"]) || [];

            queryClient.setQueryData<Part[]>(["parts"], (parts = []) =>
                parts.filter((p) => p._id !== deletedPartId)
            );

            return { originalParts: originalParts };
        },
        onSuccess: (savedPart) => {
            onSuccess(`Part deleted: ${savedPart.name}.`);
        },
        onError: (error, _, context) => {
            onError(error.message);

            if (context) {
                queryClient.setQueryData<Part[]>(
                    ["parts"],
                    context.originalParts
                );
            }
        },
    });
};

export default useDeletePart;
