import { useMutation, useQueryClient } from "@tanstack/react-query";
import HttpService from "../../services/httpService";

interface UpdateEntityData<U> {
    id: string;
    formData: U;
}

const useUpdateEntity = <T extends { _id: string; name: string }, U>(
    service: HttpService<T, U>,
    queryKey: string,
    entityType: string,
    onSuccess: (message: string) => void,
    onError: (message: string) => void
) => {
    const queryClient = useQueryClient();

    return useMutation<T, Error, UpdateEntityData<U>>({
        mutationFn: ({ id, formData }) => service.update(formData, id),
        onSuccess: (savedEntity) => {
            queryClient.invalidateQueries({
                queryKey: [queryKey],
            });
            onSuccess(`${entityType} updated: ${savedEntity.name}.`);
        },
        onError: (error) => {
            onError(error.message);
        },
    });
};

export default useUpdateEntity;
