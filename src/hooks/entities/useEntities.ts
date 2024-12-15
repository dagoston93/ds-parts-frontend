import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import HttpService from "../../services/httpService";

const useEntities = <T extends { _id: string }, U>(
    service: HttpService<T, U>,
    queryKey: string,
    onError: (message: string) => void
) => {
    const queryResult = useQuery<T[], Error>({
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
