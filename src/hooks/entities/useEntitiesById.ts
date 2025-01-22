import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import HttpService from "../../services/httpService";
import { Entity, EntityType } from "../../common/entity";

const useEntitiesByIds = <TEntity extends Entity, TFormData>(
    ids: string[],
    service: HttpService<TEntity, TFormData>,
    entityType: EntityType,
    onError: (message: string) => void
) => {
    const queryResult = useQuery<TEntity[], Error>({
        queryKey: [entityType.queryKey, ids],
        queryFn: () => service.getByIds(ids),
    });

    useEffect(() => {
        if (queryResult.isError) {
            onError(queryResult.error.message);
        }
    }, [queryResult.isError, queryResult.error, onError]);

    return queryResult;
};

export default useEntitiesByIds;
