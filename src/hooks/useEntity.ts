import { useEffect, useState } from "react";
import { AxiosResponse, CanceledError } from "axios";

interface Sercive<T> {
    getAll: () => {
        request: Promise<AxiosResponse<T[]>>;
        cancel: () => void;
    };
}

function useEntity<T>(
    service: Sercive<T>,
    errorHandler: (message: string) => void
) {
    const [entities, setEntities] = useState<T[]>([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const { request, cancel } = service.getAll();

        request
            .then((res) => {
                setEntities(res.data);
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

    return { entities, isLoading, setEntities };
}

export default useEntity;
