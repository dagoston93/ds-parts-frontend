import { useMutation, useQueryClient } from "@tanstack/react-query";
import partService, { Part, PartFormData } from "../../services/partService";

interface UpdatePartData {
    id: string;
    partFormData: PartFormData;
}

const useUpdatePart = (
    onSuccess: (message: string) => void,
    onError: (message: string) => void
) => {
    const queryClient = useQueryClient();

    return useMutation<Part, Error, UpdatePartData>({
        mutationFn: ({ id, partFormData }) =>
            partService.update(partFormData, id),
        onSuccess: (savedPart) => {
            queryClient.invalidateQueries({
                queryKey: ["parts"],
            });
            onSuccess(`Part updated: ${savedPart.name}.`);
        },
        onError: (error) => {
            onError(error.message);
        },
    });
};

export default useUpdatePart;
