import manufacturerService, {
    Manufacturer,
} from "../../services/manufacturerService";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default (onError: (message: string) => void) => {
    const queryResult = useQuery<Manufacturer[], Error>({
        queryKey: ["manufacturers"],
        queryFn: manufacturerService.getAll,
    });

    useEffect(() => {
        if (queryResult.isError) {
            onError(queryResult.error.message);
        }
    }, [queryResult.isError, queryResult.error, onError]);

    return queryResult;
};
