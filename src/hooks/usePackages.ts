import { useQuery } from "@tanstack/react-query";
import packageService, { Package } from "../services/packageService";
import { useEffect } from "react";
import { ENTITY_TYPE_PACKAGE } from "../common/entity";

export default (onError: (message: string) => void) => {
    const queryResult = useQuery<Package[], Error>({
        queryKey: [ENTITY_TYPE_PACKAGE.queryKey],
        queryFn: packageService.getAll,
    });

    useEffect(() => {
        if (queryResult.isError) {
            onError(queryResult.error.message);
        }
    }, [queryResult.isError, queryResult.error, onError]);

    return queryResult;
};
