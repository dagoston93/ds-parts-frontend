import { useEffect, useState } from "react";
import partService, { Part } from "../services/partService";
import { CanceledError } from "axios";

function useParts(errorHandler: (message: string) => void) {
    const [parts, setParts] = useState<Part[]>([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const { request, cancel } = partService.getAll();

        request
            .then((res) => {
                setParts(res.data);
                setLoading(false);
            })
            .catch((err) => {
                if (err instanceof CanceledError) {
                    return;
                }
                errorHandler(err.message);
                setLoading(false);
            });

        return () => cancel();
    }, []);

    return { parts, isLoading, setParts };
}

export default useParts;
