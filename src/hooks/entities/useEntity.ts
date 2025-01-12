import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import HttpService from "../../services/httpService";
import { Entity, EntityType } from "../../common/entity";

const useEntity = <TEntity extends Entity, TFormData>(
    id: string,
    service: HttpService<TEntity, TFormData>,
    entityType: EntityType,
    onError: (message: string) => void
) => {
    const queryResult = useQuery<TEntity, Error>({
        queryKey: [entityType.queryKey, id],
        queryFn: () => service.getById(id),
    });

    useEffect(() => {
        if (queryResult.isError) {
            onError(queryResult.error.message);
        }
    }, [queryResult.isError, queryResult.error, onError]);

    return queryResult;
};

export default useEntity;
