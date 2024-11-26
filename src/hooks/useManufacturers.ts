import manufacturerService, {
    Manufacturer,
} from "../services/manufacturerService";
import useEntity from "./useEntity";

export default (errorHandler: (message: string) => void) => {
    const { entities, isLoading, setEntities } = useEntity<Manufacturer>(
        manufacturerService,
        errorHandler
    );

    return {
        manufacturers: entities,
        isLoading,
        setManufacturers: setEntities,
    };
};
