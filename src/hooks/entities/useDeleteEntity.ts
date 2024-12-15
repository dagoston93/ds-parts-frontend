import { useMutation, useQueryClient } from "@tanstack/react-query";
import HttpService from "../../services/httpService";

interface DeleteEntityContext<T> {
    originalEntities: T[];
}

const useDeleteEntity = <T extends { _id: string; name: string }, U>(
    service: HttpService<T, U>,
    queryKey: string,
    entityType: string,
    onSuccess: (message: string) => void,
    onError: (message: string) => void
) => {
    const queryClient = useQueryClient();

    return useMutation<T, Error, string, DeleteEntityContext<T>>({
        mutationFn: service.delete,
        onMutate: (deletedEntityId: string) => {
            const originalEntities =
                queryClient.getQueryData<T[]>([queryKey]) || [];

            queryClient.setQueryData<T[]>([queryKey], (entities = []) =>
                entities.filter((p) => p._id !== deletedEntityId)
            );

            return { originalEntities };
        },
        onSuccess: (savedEntity) => {
            onSuccess(`${entityType} deleted: ${savedEntity.name}.`);
        },
        onError: (error, _, context) => {
            onError(error.message);

            if (context) {
                queryClient.setQueryData<T[]>(
                    [queryKey],
                    context.originalEntities
                );
            }
        },
    });
};

export default useDeleteEntity;
