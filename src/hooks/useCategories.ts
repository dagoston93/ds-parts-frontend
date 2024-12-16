import { useQuery } from "@tanstack/react-query";
import categoryService, { Category } from "../services/categoryService";
import { useEffect } from "react";
import { ENTITY_TYPE_CATEGORY } from "../common/entity";

export default (onError: (message: string) => void) => {
    const queryResult = useQuery<Category[], Error>({
        queryKey: [ENTITY_TYPE_CATEGORY.queryKey],
        queryFn: categoryService.getAll,
    });

    useEffect(() => {
        if (queryResult.isError) {
            onError(queryResult.error.message);
        }
    }, [queryResult.isError, queryResult.error, onError]);

    return queryResult;
};
