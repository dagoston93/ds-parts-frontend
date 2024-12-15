import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import HttpService from "../../services/httpService";

const useEntities = <TEntity extends { _id: string }, TFormData>(
    service: HttpService<TEntity, TFormData>,
    queryKey: string,
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
