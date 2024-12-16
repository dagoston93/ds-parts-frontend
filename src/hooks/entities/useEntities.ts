import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import HttpService from "../../services/httpService";
import { Entity, EntityQueryKeys } from "../../common/entity";

const useEntities = <TEntity extends Entity, TFormData>(
    service: HttpService<TEntity, TFormData>,
    queryKey: EntityQueryKeys,
    onError: (message: string) => void
) => {
    const queryResult = useQuery<TEntity[], Error>({
        queryKey: [queryKey],
        queryFn: service.getAll,
    });

    useEffect(() => {
        if (queryResult.isError) {
            onError(queryResult.error.message);
        }
    }, [queryResult.isError, queryResult.error, onError]);

    return queryResult;
};

export default useEntities;
