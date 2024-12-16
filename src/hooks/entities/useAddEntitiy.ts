import { useMutation, useQueryClient } from "@tanstack/react-query";
import HttpService from "../../services/httpService";
import { EntityType, NamedEntity } from "../../common/entity";

const useAddEntity = <TEntity extends NamedEntity, TFormData>(
    service: HttpService<TEntity, TFormData>,
    entityType: EntityType,
    onSuccess: (message: string) => void,
    onError: (message: string) => void
) => {
    const queryClient = useQueryClient();

    return useMutation<TEntity, Error, TFormData>({
        mutationFn: service.create,
        onSuccess: (savedEntity) => {
            queryClient.invalidateQueries({
                queryKey: [entityType.queryKey],
            });
            onSuccess(`${entityType.nameCapital} added: ${savedEntity.name}.`);
        },
        onError: (error) => {
            onError(error.message);
        },
    });
};

export default useAddEntity;
