import { useMutation, useQueryClient } from "@tanstack/react-query";
import HttpService from "../../services/httpService";
import { NamedEntity } from "../../common/entity";

interface UpdateEntityData<TFormData> {
    id: string;
    formData: TFormData;
}

const useUpdateEntity = <TEntity extends NamedEntity, TFormData>(
    service: HttpService<TEntity, TFormData>,
    queryKey: string,
    entityType: string,
    onSuccess: (message: string) => void,
    onError: (message: string) => void
) => {
    const queryClient = useQueryClient();

    return useMutation<TEntity, Error, UpdateEntityData<TFormData>>({
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
