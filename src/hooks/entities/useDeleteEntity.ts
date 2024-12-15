import { useMutation, useQueryClient } from "@tanstack/react-query";
import HttpService from "../../services/httpService";

interface DeleteEntityContext<TEntity> {
    originalEntities: TEntity[];
}

const useDeleteEntity = <
    TEntity extends { _id: string; name: string },
    TFormData,
>(
    service: HttpService<TEntity, TFormData>,
    queryKey: string,
    entityType: string,
    onSuccess: (message: string) => void,
    onError: (message: string) => void
) => {
    const queryClient = useQueryClient();

    return useMutation<TEntity, Error, string, DeleteEntityContext<TEntity>>({
        mutationFn: service.delete,
        onMutate: (deletedEntityId: string) => {
            const originalEntities =
                queryClient.getQueryData<TEntity[]>([queryKey]) || [];

            queryClient.setQueryData<TEntity[]>([queryKey], (entities = []) =>
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
                queryClient.setQueryData<TEntity[]>(
                    [queryKey],
                    context.originalEntities
                );
            }
        },
    });
};

export default useDeleteEntity;
