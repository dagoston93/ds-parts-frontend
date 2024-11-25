import { useEffect, useState } from "react";
import partService, { Part } from "../services/partService";
import { CanceledError } from "axios";

function useParts() {
    const [parts, setParts] = useState<Part[]>([]);
    const [error, setError] = useState("");
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
                setError(err.message);
                setLoading(false);
            });

        return () => cancel();
    }, []);

    return { parts, error, isLoading, setParts, setError };
}

export default useParts;
