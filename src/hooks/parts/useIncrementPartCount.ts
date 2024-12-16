import { useMutation, useQueryClient } from "@tanstack/react-query";
import partService, { Part } from "../../services/partService";
import { ENTITY_TYPE_PART } from "../../common/entity";

const useIncrementPartCount = (onError: (message: string) => void) => {
    const queryClient = useQueryClient();

    return useMutation<Part, Error, string>({
        mutationFn: partService.incrementCount,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [ENTITY_TYPE_PART.queryKey],
            });
        },
        onError: (error) => {
            onError(error.message);
        },
    });
};

export default useIncrementPartCount;
