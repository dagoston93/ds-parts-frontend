import partService, { Part } from "../services/partService";
import useEntity from "./useEntity";

export default (errorHandler: (message: string) => void) => {
    const { entities, isLoading, setEntities } = useEntity<Part>(
        partService,
        errorHandler
    );
    return { parts: entities, isLoading, setParts: setEntities };
};
