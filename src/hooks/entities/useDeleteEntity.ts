import { useMutation, useQueryClient } from "@tanstack/react-query";
import HttpService from "../../services/httpService";
import { EntityType, NamedEntity } from "../../common/entity";

interface DeleteEntityContext<TEntity> {
    originalEntities: TEntity[];
}

const useDeleteEntity = <TEntity extends NamedEntity, TFormData>(
    service: HttpService<TEntity, TFormData>,
    entityType: EntityType,
    onSuccess: (message: string) => void,
    onError: (message: string) => void
) => {
    const queryClient = useQueryClient();

    return useMutation<TEntity, Error, string, DeleteEntityContext<TEntity>>({
        mutationFn: service.delete,
        onMutate: (deletedEntityId: string) => {
            const originalEntities =
                queryClient.getQueryData<TEntity[]>([entityType.queryKey]) ||
                [];

            queryClient.setQueryData<TEntity[]>(
                [entityType.queryKey],
                (entities = []) =>
                    entities.filter((p) => p._id !== deletedEntityId)
            );

            return { originalEntities };
        },
        onSuccess: (savedEntity) => {
            onSuccess(
                `${entityType.nameCapital} deleted: ${savedEntity.name}.`
            );
        },
        onError: (error, _, context) => {
            onError(error.message);

            if (context) {
                queryClient.setQueryData<TEntity[]>(
                    [entityType.queryKey],
                    context.originalEntities
                );
            }
        },
    });
};

export default useDeleteEntity;
