import { useQuery } from "@tanstack/react-query";
import partService, { Part } from "../services/partService";
import { useEffect } from "react";

export default (onError: (message: string) => void) => {
    const queryResult = useQuery<Part[], Error>({
        queryKey: ["parts"],
        queryFn: partService.getAll,
    });

    useEffect(() => {
        if (queryResult.isError) {
            onError(queryResult.error.message);
        }
    }, [queryResult.isError, queryResult.error, onError]);

    return queryResult;
};
