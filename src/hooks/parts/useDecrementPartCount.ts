import { useMutation, useQueryClient } from "@tanstack/react-query";
import partService, { Part } from "../../services/partService";

const useDecrementPartCount = (onError: (message: string) => void) => {
    const queryClient = useQueryClient();

    return useMutation<Part, Error, string>({
        mutationFn: partService.decrementCount,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["parts"],
            });
        },
        onError: (error) => {
            onError(error.message);
        },
    });
};

export default useDecrementPartCount;
