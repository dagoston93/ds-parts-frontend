import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import fileService, { File } from "../../services/fileService";

const useImages = (onError: (message: string) => void) => {
    const queryResult = useQuery<File[], Error>({
        queryKey: ["images"],
        queryFn: fileService.getAllImages,
    });

    useEffect(() => {
        if (queryResult.isError) {
            onError(queryResult.error.message);
        }
    }, [queryResult.isError, queryResult.error, onError]);

    return queryResult;
};

export default useImages;
