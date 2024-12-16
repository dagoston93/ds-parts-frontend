import { useMutation, useQueryClient } from "@tanstack/react-query";
import HttpService from "../../services/httpService";
import { NamedEntity } from "../../common/entity";

const useAddEntity = <TEntity extends NamedEntity, TFormData>(
    service: HttpService<TEntity, TFormData>,
    queryKey: string,
    entityType: string,
    onSuccess: (message: string) => void,
    onError: (message: string) => void
) => {
    const queryClient = useQueryClient();

    return useMutation<TEntity, Error, TFormData>({
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
