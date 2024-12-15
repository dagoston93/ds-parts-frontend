import { useMutation, useQueryClient } from "@tanstack/react-query";
import HttpService from "../../services/httpService";

const useAddEntity = <T extends { _id: string; name: string }, U>(
    service: HttpService<T, U>,
    queryKey: string,
    entityType: string,
    onSuccess: (message: string) => void,
    onError: (message: string) => void
) => {
    const queryClient = useQueryClient();

    return useMutation<T, Error, U>({
        mutationFn: service.create,
        onSuccess: (savedEntity) => {
            queryClient.invalidateQueries({
                queryKey: [queryKey],
            });
            onSuccess(`${entityType} added: ${savedEntity.name}.`);
        },
        onError: (error) => {
            onError(error.message);
        },
    });
};

export default useAddEntity;
