import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import fileService, { File } from "../../services/fileService";

const useFiles = (onError: (message: string) => void) => {
    const queryResult = useQuery<File[], Error>({
        queryKey: ["files"],
        queryFn: fileService.getAllFiles,
    });

    useEffect(() => {
        if (queryResult.isError) {
            onError(queryResult.error.message);
        }
    }, [queryResult.isError, queryResult.error, onError]);

    return queryResult;
};

export default useFiles;
