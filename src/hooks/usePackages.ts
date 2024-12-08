import { useQuery } from "@tanstack/react-query";
import packageService, { Package } from "../services/packageService";
import { useEffect } from "react";

export default (onError: (message: string) => void) => {
    const queryResult = useQuery<Package[], Error>({
        queryKey: ["packages"],
        queryFn: packageService.getAll,
    });

    useEffect(() => {
        if (queryResult.isError) {
            onError(queryResult.error.message);
        }
    }, [queryResult.isError, queryResult.error, onError]);

    return queryResult;
};
