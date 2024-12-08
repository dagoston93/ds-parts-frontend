import { useQuery } from "@tanstack/react-query";
import categoryService, { Category } from "../services/categoryService";
import { useEffect } from "react";

export default (onError: (message: string) => void) => {
    const queryResult = useQuery<Category[], Error>({
        queryKey: ["categories"],
        queryFn: categoryService.getAll,
    });

    useEffect(() => {
        if (queryResult.isError) {
            onError(queryResult.error.message);
        }
    }, [queryResult.isError, queryResult.error, onError]);

    return queryResult;
};
