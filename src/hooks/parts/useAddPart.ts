import { useMutation, useQueryClient } from "@tanstack/react-query";
import partService, { Part, PartFormData } from "../../services/partService";

const useAddPart = (
    onSuccess: (message: string) => void,
    onError: (message: string) => void
) => {
    const queryClient = useQueryClient();

    return useMutation<Part, Error, PartFormData>({
        mutationFn: partService.create,
        onSuccess: (savedPart) => {
            queryClient.invalidateQueries({
                queryKey: ["parts"],
            });
            onSuccess(`Part added: ${savedPart.name}.`);
        },
        onError: (error) => {
            onError(error.message);
        },
    });
};

export default useAddPart;
